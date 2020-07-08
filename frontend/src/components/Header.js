import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ProfileMenu from './ProfileMenu';
import Button from '@material-ui/core/Button';
//import Rooms from './Rooms';
import NotificationsDD from './NotificationsDD';
import MessagesDD from './MessagesDD';
import {Link} from 'react-router-dom';

const useStyles = (theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: '2vh',
    color: "#fff"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});

class Header extends React.Component {
  constructor(props){
    super(props);
    this.profileMenuId = 'primary-search-account-menu';
    this.notificationsId = 'secondary-search-account-menu';
    this.notificationsId = 'tertiary-search-account-menu';
    this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
    this.handleNotificationsClose = this.handleNotificationsClose.bind(this);
    this.handleMessagesClose = this.handleMessagesClose.bind(this);
    this.state = {
      profileAnchorElem: null,
      notificationAnchorElem: null,
      messagesAnchorElem: null,
      searchBox: ""
    }
  }

  handleNotificationsOpen(ev){
    this.setState({
      notificationAnchorElem: ev.currentTarget
    })
  }

  handleNotificationsClose(ev){
    this.setState({
      notificationAnchorElem: null
    })
  }

  handleProfileMenuOpen(ev){
    this.setState({
      profileAnchorElem: ev.currentTarget
    })
  }

  handleProfileMenuClose(){
    this.setState({
      profileAnchorElem: null
    })
  }

  handleMessagesOpen(ev){
    this.setState({
      messagesAnchorElem: ev.currentTarget
    })
  }

  handleMessagesClose(){
    this.setState({
      messagesAnchorElem: null
    })
  }

  handleSearchBox(ev){
    this.setState({
      searchBox: ev.target.value
    })
  }

  render(){
    const {classes} = this.props;
    const isProfileMenuOpen = Boolean(this.state.profileAnchorElem);
    const isNotificationsOpen = Boolean(this.state.notificationAnchorElem);
    const isMessagesOpen = Boolean(this.state.messagesAnchorElem);

    return (
      <div className={classes.grow} >
        <AppBar position="static" color="inherit" style={{background: "#5f5f5f"}}>
          <Toolbar>
            <Typography variant="h6" noWrap>
               <Link to="/" className="headerLink"> Phanhoo </Link> 
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase 
                placeholder="search"
                inputProps={{ 'aria-label': 'search' }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.state.searchBox}
                onChange={(ev) => this.handleSearchBox(ev)}
              />
            </div>
            <div className={classes.grow}></div>
            <div className="classes.sectionDesktop">
              <Button color="inherit">
               <Link to="/rooms" className="headerLink"> Rooms </Link> 
              </Button>
              <Button color="inherit">
                <Link to="/users" className="headerLink"> People </Link> 
              </Button>
              <IconButton 
                aria-label="show 4 new mails" 
                color="inherit"
                aria-haspopup="true"
                onClick={(ev) => this.handleMessagesOpen(ev)}
              >
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton 
                color="inherit"
                aria-label="notifications"
                aria-haspopup="true"
                onClick={(ev) => this.handleNotificationsOpen(ev)}
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={this.menuId}
                aria-haspopup="true"
                onClick={(ev) => this.handleProfileMenuOpen(ev)}
                color="inherit"
              >
               <AccountCircle />
             </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <ProfileMenu 
          anchorElem={this.state.profileAnchorElem}
          menuId={this.profileMenuId}
          isMenuOpen={isProfileMenuOpen}
          onClose={this.handleProfileMenuClose}
        />
        <NotificationsDD 
          anchorElem={this.state.notificationAnchorElem}
          menuId={this.notificationsId}
          isMenuOpen={isNotificationsOpen}
          onClose={this.handleNotificationsClose}
        />
        <MessagesDD 
          anchorElem={this.state.messagesAnchorElem}
          menuId={this.messagesId}
          isMenuOpen={isMessagesOpen}
          onClose={this.handleMessagesClose}
        />

      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Header);



