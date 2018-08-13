import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import LinkDraggable from "./LinkDraggable";

export default class LinksDnD extends Component {
  onDragEnd = ({ source, destination }) => {
    if (destination) {
      this.props.reposition(source.index, destination.index);
    }
  };

  render() {
    const { links, update, remove } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd} data-test="LinksDnD">
        <Droppable droppableId="droppable">
          {({ innerRef, placeholder }) => (
            <div ref={innerRef}>
              {links.map((link, index) => (
                <LinkDraggable
                  key={index}
                  position={index}
                  link={link}
                  update={update}
                  remove={remove}
                />
              ))}
              {placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

LinksDnD.propTypes = {
  links: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  reposition: PropTypes.func.isRequired
};
