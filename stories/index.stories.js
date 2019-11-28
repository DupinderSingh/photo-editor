import React from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import ImageEditor from '../src/index';
// import {storiesOf} from '@storybook/react';

// const stories = storiesOf('Toast UI ImageEditor', module);

const props = {
  includeUI: {
    loadImage: {
      path: 'img/sampleImage2.png',
      name: 'sampleImage2'
    },
    initMenu: 'shape',
    uiSize: {
      height: '700px',
      width: '1000px'
    }
  },
  cssMaxWidth: 700,
  cssMaxHeight: 500
};

class Story extends React.Component {
  ref = React.createRef();

  imageEditor = null;

  componentDidMount() {
    this.imageEditor = this.ref.current.getInstance();
    // get the data from api and set to the editor. // get all the "type" match variable and load one by one onto the editor.
    window.setTimeout(() => {
      // check for every object and according to it set the function..... eg addShape for square, rect. addImage for image.....
      this.imageEditor.addShape('rect', {
        id: 100,
        fill: 'red',
        stroke: 'blue',
        strokeWidth: 3,
        width: 100,
        height: 200,
        left: 10,
        top: 10,
        isRegular: true
      });


      // let getPosition = this.imageEditor.getObjectPosition(100, 'left', 'top');
      // console.log(getPosition, "getPosition")
    }, 2000);
  }

  getTriangle() {
    // this.imageEditor.addShape('rect', {
    //   fill: 'red',
    //   stroke: 'blue',
    //   strokeWidth: 3,
    //   width: 100,
    //   height: 200,
    //   left: 10,
    //   top: 10,
    //   isRegular: true
    // });
  }

  flipImageByAxis(isXAxis) {
    this.imageEditor[isXAxis ? 'flipX' : 'flipY']()
      .then((status) => {
        console.log('flipX: ', status.flipX);
        console.log('flipY: ', status.flipY);
        console.log('angle: ', status.angle);
      })
      ['catch']((message) => {
      console.log('error: ', message);
    });
  }

  render() {
    // on anything change or added update we have to update the json side by side.......
    return (
      <>
        <ImageEditor
          ref={this.ref}
          {...props}
          onMousedown={(event, originPointer) => {
            console.log(event);
            console.log(originPointer);
          }}
          onAddText={(pos) => {
            const {x: ox, y: oy} = pos.originPosition;
            const {x: cx, y: cy} = pos.clientPosition;
            console.log(`text position on canvas(x, y): ${ox}px, ${oy}px`);
            console.log(`text position on brwoser(x, y): ${cx}px, ${cy}px`);
          }}
          onObjectMoved={(props) => { // PARTICULAR OBJECT CHANGED AND DETAILS...
            alert('object moved');
            console.log(props, 'object moved');
            console.log(props.type);
          }}
          onUndoStackChanged={(length) => {
            console.log(length, 'onUndoStackChanged');
          }}
          onObjectActivated={(props) => {
            console.log('object activated...');
            console.log(props);
            console.log(props.type);
            console.log(props.id);
          }}
        />
        <button
          onClick={this.getTriangle.bind(this)}>
          get me rect
        </button>
        <button
          onClick={() => {
            this.flipImageByAxis(true);
          }}
        >
          Flip-X!
        </button>
        <button
          onClick={() => {
            this.flipImageByAxis(false);
          }}
        >
          Flip-Y!
        </button>
      </>
    );
  }
}
