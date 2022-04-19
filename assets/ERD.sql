// paste this into https://dbdiagram.io/d
Table installations {
  id int [pk, increment] // auto-increment
  name varchar
  location varchar
}

Table commands {
  id int [pk, increment] // auto-increment
  name varchar
  abbrev varchar
  function varchar
  installation_id int [ref: > installations.id] // inline relationship (many-to-one)
  img varchar
}

Table deltas {
  id int [pk, increment] // auto-increment
  name varchar
  abbrev varchar
  function varchar
  command_id int [ref: > commands.id] // inline relationship (many-to-one)
  img varchar
}

Table squadrons {
  id int [pk, increment] // auto-increment
  name varchar
  abbrev varchar
  function varchar
  delta_id int [ref: > deltas.id] // inline relationship (many-to-one)
  img varchar
}

Table roles {
  id int [pk, increment] // auto-increment
  title varchar
  description varchar
}

Enum processing_status {
  in_processing
  in_transit
  out_processing
  stationary
}

// users will have either be assigned to 
// command, delta, or squadron. 
// 
// 2 options here
// 1.) Only one of the assigned_to_ will be not null
//     and the task will keep going up the chain
// 2.) assigned_to_ sets the lowest applicable position and up
//     ex. Assigned to a delta means only assignet_to_squadron is null
//     I think this would be easier to implement (would need to add installations to table)
//     "I haven't considered pros & cons yet though"
Table users {
  id int [pk, increment] // auto-increment
  first_name varchar
  last_name varchar
  password varchar
  office_symbol varchar
  assigned_to_command int [ref: > commands.id]
  assigned_to_delta int [ref: > deltas.id]
  assignet_to_squadron  int [ref: > squadrons.id]
  status processing_status 
  role int [ref: > roles.id]
  supervisor int [ref: > users.id]
  created_at timestamp
  updated_at timestamp
}

// Enum for 'tasks' tables below
Enum task_status {
  not_started
  in_progress
  completed
}

Table installations_tasks {
  id int [pk, increment] // auto-increment
  title varchar
  description varchar
  task_type processing_status
  assigned_by int [ref: > installations.id] // inline relationship (many-to-one)
  approver int [ref: > users.id]
  created_at timestamp
  updated_at timestamp
}

Table commands_tasks {
  id int [pk, increment] // auto-increment
  title varchar
  description varchar
  task_type processing_status
  assigned_by int [ref: > commands.id] // inline relationship (many-to-one)
  approver int [ref: > users.id]
  created_at timestamp
  updated_at timestamp
}

Table deltas_tasks {
  id int [pk, increment] // auto-increment
  title varchar
  description varchar
  task_type processing_status
  assigned_by int [ref: > deltas.id] // inline relationship (many-to-one)
  approver int [ref: > users.id]
  created_at timestamp
  updated_at timestamp
}

Table squadrons_tasks {
  id int [pk, increment] // auto-increment
  title varchar
  description varchar
  task_type processing_status
  assigned_by int [ref: > squadrons.id] // inline relationship (many-to-one)
  approver int [ref: > users.id]
  created_at timestamp
  updated_at timestamp
}

Table users_installations_tasks {
  id int [pk, increment]
  user_id int [ref: > users.id]
  installation_task int [ref: > installations.id]
  created_at timestamp
  updated_at timestamp
}

Table users_commands_tasks {
  id int [pk, increment]
  user_id int [ref: > users.id]
  command_task int [ref: > commands.id]
  created_at timestamp
  updated_at timestamp
}

Table users_delta_tasks {
  id int [pk, increment]
  user_id int [ref: > users.id]
  delta_task int [ref: > deltas.id]
  status task_status
  created_at timestamp
  updated_at timestamp
}

Table users_squadrons_tasks {
  id int [pk, increment]
  user_id int [ref: > users.id]
  squadron_task int [ref: > squadrons.id]
  status task_status
  created_at timestamp
  updated_at timestamp
}

// By binding tasks to this table we can differtiate
// by the each PCS rather than all user's tasks with a processing_status
Table pcs_event {
  id int [pk, increment]
  user_id int [ref: > users.id]
  installation_task int [ref: > users_installations_tasks.id]
  command_task int [ref: > users_commands_tasks.id]
  delta_task int [ref: > users_delta_tasks.id]
  squadron_task int [ref: > users_squadrons_tasks.id]
  status task_status
  created_at timestamp
  updated_at timestamp
} 
