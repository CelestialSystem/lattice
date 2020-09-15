import React from 'react';
import { observer, inject } from 'mobx-react';
import Types from 'prop-types';
import { ListItem, ListItemSecondaryAction } from '@latticejs/infinite-list';
import { ListItemText, Checkbox, Switch, IconButton, Tooltip } from '@material-ui/core';
import { compose, withHandlers } from 'recompose';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const enhance = compose(
  // withStyles(ListItemStyles),
  inject('uiStore', 'projectStore'),
  withHandlers({
    toggleChecked: ({ uiStore: { projectList }, projectId }) => () => {
      if (projectList.isChecked(projectId)) {
        return projectList.setChecked(projectId, false);
      }
      projectList.setChecked(projectId);
    },
    toggleActive: ({ projectId, projectStore }) => (e) => {
      e.stopPropagation();
      projectStore.toggleActive(projectId);
    },
    remove: ({ uiStore, projectStore, projectId }) => (e) => {
      e.stopPropagation();

      uiStore.dialogs.showConfirm({
        content: (
          <div>
            Are you sure to delete <b>{projectStore.projects.get(projectId).name}?</b>
          </div>
        ),
        onAccept: () => projectStore.remove(projectId),
      });
    },
    edit: ({ onEdit, projectId }) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      onEdit(projectId);
    },
  }),
  observer
);

const RemoveIcon = ({ onClick }) => (
  <Tooltip title="Delete">
    <IconButton aria-label="Delete" onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  </Tooltip>
);

const ToggleActiveIcon = ({ checked, onClick }) => {
  return (
    <Tooltip title={`${checked ? 'Deactivate' : 'Activate'}`}>
      <Switch onClick={onClick} checked={checked} color="primary" />
    </Tooltip>
  );
};

const ShowEditIcon = ({ onClick }) => (
  <Tooltip title="Edit">
    <IconButton aria-label="Edit" onClick={onClick}>
      <EditIcon />
    </IconButton>
  </Tooltip>
);

RemoveIcon.propTypes = ShowEditIcon.propTypes = {
  onClick: Types.func,
};

ToggleActiveIcon.propTypes = {
  onClick: Types.func,
  checked: Types.bool,
};

export default enhance(
  ({ projectId, uiStore, projectStore, toggleChecked, toggleActive, remove, edit, style, classes }) => {
    const isChecked = uiStore.projectList.checked.has(projectId);
    const { name, author, active } = projectStore.projects.get(projectId);

    return (
      <ListItem button onClick={toggleChecked} selected={isChecked} style={style} classes={classes}>
        <Checkbox checked={isChecked} tabIndex={-1} disableRipple />

        <ListItemText primary={name} secondary={author} />

        <ListItemSecondaryAction>
          <ShowEditIcon onClick={edit} />
          <RemoveIcon onClick={remove} />
          <ToggleActiveIcon onClick={toggleActive} checked={active} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);

// import React, { Component } from 'react';
// import { observer, inject } from 'mobx-react';
// import Types from 'prop-types';
// import { ListItem, ListItemSecondaryAction } from '@latticejs/infinite-list';
// import { ListItemText, Checkbox, Switch, IconButton, Tooltip } from '@material-ui/core';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';

// const RemoveIcon = ( onClick ) => {
//   return(
//     <Tooltip title="Delete">
//     <IconButton aria-label="Delete" onClick={onClick}>
//       <DeleteIcon />
//     </IconButton>
//   </Tooltip>
//   )
// };

// const ShowEditIcon = ( onClick ) => {
//   return (
//   <Tooltip title="Edit">
//     <IconButton aria-label="Edit" onClick={onClick}>
//       <EditIcon />
//     </IconButton>
//   </Tooltip>
//   );
// };

// const ToggleActiveIcon = ( checked, onClick ) => {
//   return (
//     <Tooltip title={`${checked ? 'Deactivate' : 'Activate'}`}>
//       <Switch onClick={onClick} checked={checked} color="primary" />
//     </Tooltip>
//   );
// };

// class Item extends Component {

//   edit = (onEdit, projectId) => (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     onEdit(projectId);
//   };

//   remove = ( uiStore, projectStore, projectId ) => (e) => {
//     e.stopPropagation();

//     uiStore.dialogs.showConfirm({
//       content: (
//         <div>
//           Are you sure to delete <b>{projectStore.projects.get(projectId).name}?</b>
//         </div>
//       ),
//       onAccept: () => projectStore.remove(projectId),
//     });
//   };

//   toggleActive = (projectId, projectStore) => (e) => {
//     e.stopPropagation();
//     projectStore.toggleActive(projectId);
//   };

//   toggleChecked = ( uiStore, projectId ) => () => {
//     if (uiStore.projectList.isChecked(projectId)) {
//       return uiStore.projectList.setChecked(projectId, false);
//     }
//     uiStore.projectList.setChecked(projectId);
//   };

//   render() {
//     const { projectId, uiStore, projectStore, onEdit, style, classes } = this.props
//     const isChecked = uiStore.projectList.checked.has(projectId);
//     const { name, author, active } = projectStore.projects.get(projectId);
//     return (
//       <ListItem button onClick={this.toggleChecked(uiStore,projectId)} selected={isChecked} style={style} classes={classes}>
//         <Checkbox checked={isChecked} tabIndex={-1} disableRipple />

//         <ListItemText primary={name} secondary={author} />

//         <ListItemSecondaryAction>
//           <ShowEditIcon onClick={this.edit(onEdit,projectId)} />
//           <RemoveIcon onClick={this.remove(uiStore,projectStore,projectId)} />
//           <ToggleActiveIcon onClick={this.toggleActive(projectId,projectStore)} checked={active} />
//         </ListItemSecondaryAction>
//       </ListItem>
//     );
//   }
// };

// export default inject('uiStore','projectStore')(observer(Item));

// RemoveIcon.propTypes = ShowEditIcon.propTypes = {
//   onClick: Types.func,
// };

// ToggleActiveIcon.propTypes = {
//   onClick: Types.func,
//   checked: Types.bool,
// };
