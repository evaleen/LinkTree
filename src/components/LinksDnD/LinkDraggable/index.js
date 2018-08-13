import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import LinkEditor from "../../LinkEditor";

export default class LinkDraggable extends Component {

  render() {
    const { link, position, update, remove } = this.props;
    return (
      <Draggable key={link.id} draggableId={link.id} index={position} data-test="LinkEditor">
        {({ innerRef, draggableProps, dragHandleProps }) => (
          <div
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
          >
            <LinkEditor
              link={link}
              update={update}
              remove={remove}
            />
          </div>
        )}
      </Draggable>
    );
  }
}

LinkDraggable.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.number.isRequired,
    deleted: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    highlight: PropTypes.string.isRequired,
    unsafe: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    schedule_start: PropTypes.string.isRequired,
    schedule_start_timezone: PropTypes.string.isRequired,
    schedule_end: PropTypes.string.isRequired,
    schedule_end_timezone: PropTypes.string.isRequired,
    clicks: PropTypes.array.isRequired,
    click_count: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired
  }),
  position: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};
