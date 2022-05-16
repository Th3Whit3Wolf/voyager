import { useContext, useState } from "react";
import {
	Box,
	Toolbar,
	useTheme,
	styled,
	Drawer as MuiDrawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from "@mui/material";

import {
	Analytics as AnalyticsIcon,
	Task as TaskIcon,
	Settings as SettingsIcon
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
// Also need a small title shows USER or ADMIN
import { useLocation } from "react-router-dom";
import { PageContext, UserContext } from "#context";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme)
	})
}));

const openedMixin = thm => ({
	boxSizing: "border-box",
	width: drawerWidth,
	transition: thm.transitions.create("width", {
		easing: thm.transitions.easing.sharp,
		duration: thm.transitions.duration.enteringScreen
	}),
	overflowX: "hidden"
});

const closedMixin = thm => ({
	transition: thm.transitions.create("width", {
		easing: thm.transitions.easing.sharp,
		duration: thm.transitions.duration.leavingScreen
	}),
	overflowX: "hidden",
	width: `calc(${thm.spacing(7)} + 1px)`,
	[thm.breakpoints.up("sm")]: {
		width: `calc(${thm.spacing(8)} + 1px)`
	}
});

const SideBar = () => {
	const location = useLocation();
	const theme = useTheme();
	const { page, setPage } = useContext(PageContext);
	const { user } = useContext(UserContext);
	const [open, setOpen] = useState(false);

	console.log({ user });
	console.log("User: ", user);
	console.log("Page: ", page);

	const handleDrawerOpen = () => {
		if (!open) {
			setOpen(true);
		}
	};

	const handleDrawerClose = () => {
		if (open) {
			setOpen(false);
		}
	};

	const handleListOnClick = (e, name) => {
		e.preventDefault();
		console.log(`handleListOnClick (${page} === ${name}) ${page === name}`);
		if (page !== name) {
			setPage(name);
		}
	};

	return (
		<Drawer
			variant="permanent"
			open={open}
			onMouseEnter={handleDrawerOpen}
			onMouseLeave={handleDrawerClose}
			sx={{
				display: location.pathname !== "/dashboard" ? "none" : "block"
			}}
		>
			<Toolbar />
			<Toolbar />
			<Box sx={{ overflow: "hidden" }}>
				{user?.role?.kind !== "USER" && (
					<List disablePadding>
						<ListItemButton
							data-testid="buttonAnalytics"
							selected={page === "Analytics"}
							onClick={e => handleListOnClick(e, "Analytics")}
							sx={{
								"&.Mui-selected": {
									backgroundColor: theme.palette.selected
								},
								"&.MuiListItemButton-root:hover": {
									backgroundColor: theme.palette.hover.list
								}
							}}
						>
							<ListItemIcon sx={{ color: theme.palette.gsb.primary }}>
								<AnalyticsIcon />
							</ListItemIcon>
							<ListItemText
								primary="Analytics"
								sx={{ color: theme.palette.gsb.primary }}
							/>
						</ListItemButton>
					</List>
				)}
				<List disablePadding>
					<ListItemButton
						data-testid="buttonTasks"
						selected={page === "Tasks"}
						onClick={e => handleListOnClick(e, "Tasks")}
						sx={{
							"&.Mui-selected": {
								backgroundColor: theme.palette.selected
							},
							"&.MuiListItemButton-root:hover": {
								backgroundColor: theme.palette.hover.list
							}
						}}
					>
						<ListItemIcon sx={{ color: theme.palette.gsb.primary }}>
							<TaskIcon />
						</ListItemIcon>
						<ListItemText
							primary="Tasks"
							sx={{ color: theme.palette.gsb.primary }}
						/>
					</ListItemButton>
				</List>
				<List disablePadding>
					<ListItemButton
						data-testid="buttonUserSettings"
						selected={page === "Settings"}
						onClick={e => handleListOnClick(e, "Settings")}
						sx={{
							"&.Mui-selected": {
								backgroundColor: theme.palette.selected
							},
							"&.MuiListItemButton-root:hover": {
								backgroundColor: theme.palette.hover.list
							}
						}}
					>
						<ListItemIcon sx={{ color: theme.palette.gsb.primary }}>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText
							primary="Settings"
							sx={{ color: theme.palette.gsb.primary }}
						/>
					</ListItemButton>
				</List>
			</Box>
		</Drawer>
	);
};

export default SideBar;
