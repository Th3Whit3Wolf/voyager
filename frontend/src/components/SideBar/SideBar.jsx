import { useContext, useState } from "react";
import {
	Box,
	Toolbar,
	useTheme,
	styled,
	Drawer as MuiDrawer,
	ListItem,
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
import { UserContext } from "#context";
// Also need a small title shows USER or ADMIN
import { useLocation } from "react-router-dom";

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
	const { user, setUser } = useContext(UserContext);
	const [open, setOpen] = useState(false);

	console.log("Location", location);

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

	return (
		<Drawer
			variant="permanent"
			open={open}
			onMouseEnter={handleDrawerOpen}
			onMouseLeave={handleDrawerClose}
			sx={{
				display: location.pathname == "/" ? "none" : "block"
			}}
		>
			<Toolbar />
			<Toolbar />
			<Box sx={{ overflow: "hidden" }}>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<AnalyticsIcon />
						</ListItemIcon>
						<ListItemText primary="Analytics" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<TaskIcon />
						</ListItemIcon>
						<ListItemText primary="Tasks" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItemButton>
				</ListItem>
			</Box>
		</Drawer>
	);
};

export default SideBar;
