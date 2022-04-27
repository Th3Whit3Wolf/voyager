const TableRow = () => {

return(
<TableCell>
								<Switch
									onChange={() =>
										console.log(`Switch has been changed id ${entry.id}`)
									}
								/>
							</TableCell>
							<TableCell>{entry.title}</TableCell>
							<TableCell>{entry.description}</TableCell>
							<TableCell>{entry.approver}</TableCell>
							<TableCell>Not in Current ERD</TableCell>
							<TableCell>Not in Current ERD</TableCell>
							<TableCell>
								{`${
									entry.updated_at.getUTCMonth() + 1
								} - ${entry.updated_at.getUTCDate()} - ${entry.updated_at.getUTCFullYear()}`}
							</TableCell>
							<TableCell>{entry.owner}</TableCell>
							<TableCell>
								<Button
									onClick={() => console.log(`Item Deleted id ${entry.id}`)}
								>
									Delete
								</Button>
							</TableCell>)

};
