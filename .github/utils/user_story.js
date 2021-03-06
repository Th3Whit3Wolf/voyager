const { Octokit } = require("@octokit/action");

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const issue_number = eventPayload.issue.number;

const parseIssuePayload = payload => {
    let headerCount = 0;
    let issueObj = {};
    
    console.log("Original Body: ", payload.issue.body);

    payload.issue.body.split("\n\n").forEach(str => {
        switch (str) {
            case "### As a ...":
                headerCount = 1;
                break;
            case "### I want to ...":
                headerCount = 2;
                break;
            case "### So that ...":
                headerCount = 3;
                break;
            case "### Where does this user story require work done?":
                headerCount = 4;
                break;
            case "### Which project does this user story belong?":
                headerCount = 5;
                break;
            case "### Acceptance criteria":
                headerCount = 6;
                break;
            case "### Resources":
                headerCount = 7;
                break;
            case "### Notes":
                headerCount = 8;
                break;
            default:
                switch (headerCount) {
                    case 1:
                        issueObj["persona"] = str;
                        break;
                    case 2:
                        issueObj["goal"] = str;
                        break;
                    case 3:
                        issueObj["reason"] = str;
                        break;
                    case 4:
                        issueObj["labor"] = str;
                        break;
                    case 5:
                        issueObj["project"] = str;
                        break;
                    case 6:
                        if (typeof issueObj["criteria"] === 'undefined') {
                            
                            issueObj["criteria"] = [];
                        }
                        if (str !== "_No response_") {
                            str.split("\n").forEach(c => issueObj["criteria"].push(c));
                        }

                        break;
                    case 7:
                        if (typeof issueObj["resources"] === 'undefined') {
                            issueObj["resources"] = [];
                        }
                        if (str !== "_No response_") {
                            str.split("\n").forEach(c => issueObj["resources"].push(c));
                        }
                        break;
                    case 8:
                        if (typeof issueObj["notes"] === 'undefined') {
                            issueObj["notes"] = [];
                        }
                        if (str !== "_No response_") {
                            str.split("\n").forEach(c => issueObj["notes"].push(c));
                        }
                        break;
                }
                break;
        }
    })

    if (typeof issueObj["labels"] === 'undefined') {
        issueObj["labels"] = [];
    }

    switch (issueObj.labor) {
        case "Backend":
            issueObj.labels.push("Labor: Backend");
            break;
        case "Frontend":
            issueObj.labels.push("Labor: Frontend");
            break;
        case "Both":
            issueObj.labels.push("Labor: Full Stack");
            break;
    }

    switch (issueObj.project) {
        case "MVP":
            issueObj.labels.push("Project: MVP");
            break;
    }
    
    issueObj["labels"].push("User Story");
    return issueObj;
}

const mkNewBody = (issue, newTasks) => {
    const { persona, goal, reason, criteria, resources, notes } = issue;
    let mdArr = [];
    if (newTasks !== undefined && newTasks.length > 0) {
        mdArr.push(`### Acceptance Criteria\n${newTasks.join("\n")}`)
    } else if (resources.length > 0) {
        mdArr.push(`### Acceptance Criteria\n${criteria.join("\n")}`)
    }
    if (resources.length > 0) {
        mdArr.push(`### Resources\n${resources.join("\n")}`)
    }
    if (notes.length > 0) {
        mdArr.push(`### Notes\n${notes.join("\n")}`)
    }
    const md = (mdArr.length > 0) ? `\n\n${mdArr.join("\n\n")}` : "";
    return `## User Story

As a ${persona}, I want to ${goal}, so that ${reason}.

| As a/an    | I want to ... | So that ... |
|:---------- |:------------- | :---------- |
| ${persona} | ${goal}       |  ${reason}  |
${md}`
}

const mkTaskIssues = async (tasks) => {
    let newTasks = [];

    for (let task of tasks) {
        task = task.replace("- [ ]", "");
        task = task.trim();
        const title = task[0].toUpperCase() + task.substring(1).replaceAll("_", " ");

        const { data } = await octokit.request("POST /repos/{owner}/{repo}/issues", {
            owner,
            repo,
            title,
            labels: ["task"]
        });
        newTasks.push(`- [ ] #${data.number}`)
    }
    return newTasks;
}

const run = async () => {
    try {
        const issueData = parseIssuePayload(eventPayload);
        console.log({issueData});
        const newTasks = await mkTaskIssues(issueData.criteria);
        const body = mkNewBody(issueData, newTasks);
        const title = `As a ${issueData.persona}, I want to ${issueData.goal}, so that ${issueData.reason}`;
        const { data } = await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
            owner,
            repo,
            issue_number,
            title,
            body,
            labels: issueData.labels
        });
        return data;
    } catch (err) {
        console.log("Not a User Story Submission");   
    }
}

run().then(data => {
    console.log(data);
})
