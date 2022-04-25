import React from "react";

// Our Styles
import styles from "./SplashScreen.module.css";

// MUI Styles

const SplashScreen = () => {
	return (
		<div className={styles.blackout}>
			<div className={styles.center}>
				<div>
					<table style={{ width: "600px", tableLayout: "fixed" }}>
						<tbody>
							<tr>
								<td>
									<div className={styles.mimicTyping1}>Inprocessing Now</div>
								</td>
								<td>
									{" "}
									<svg className={styles.animatedCheck1} viewBox="0 0 48 23">
										<path d="M6 13L9 17.6 20.3 8.3" fill="none" />
									</svg>
								</td>
							</tr>
							<tr>
								<td>
									<div className={styles.mimicTyping2}>Outprocessing Now</div>
								</td>
								<td>
									<svg className={styles.animatedCheck2} viewBox="0 0 48 23">
										<path d="M6 13L9 17.6 20.3 8.3" fill="none" />{" "}
									</svg>
								</td>
							</tr>
							<tr>
								<td>
									<div className={styles.mimicTyping3}>
										Success - Your Turn!
									</div>
								</td>
								<td>
									<svg className={styles.animatedCheck} viewBox="0 0 48 23">
										<path d="M6 13L9 17.6 20.3 8.3" fill="none" />{" "}
									</svg>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default SplashScreen;
