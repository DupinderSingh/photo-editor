import React from 'react';
import {storiesOf} from '@storybook/react';

import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import ImageEditor from '../src/index';
import {checkValidation} from '../src/actions/actionjs';

const stories = storiesOf('Toast UI ImageEditor', module);

const props = {
  includeUI: {
    loadImage: {
      path: 'img/sampleImage2.png',
      name: 'sampleImage2'
    },
    theme: {
      'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
      'common.bisize.width': '251px',
      'common.bisize.height': '21px',
      'common.backgroundImage': 'none',
      'common.backgroundColor': '#1e1e1e',
      'common.border': '0px'
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

let thi = null;

stories.add('Include default UI', () => <ImageEditor {...props} />);

stories.add('Using Method', () => {
  class Story extends React.Component {
    ref = React.createRef();

    imageEditor = null;

    componentDidMount() {
      // id="tie-btn-mask"
      thi = this;
      this.imageEditor = this.ref.current.getInstance();
      // get the data from api and set to the editor. // get all the "type" match variable and load one by one onto the editor.
      window.setTimeout(() => {
        // check for every object and according to it set the function..... eg addShape for square, rect. addImage for image.....
        // this.imageEditor.addShape('rect', {
        //   id: 100,
        //   fill: 'red',
        //   stroke: 'blue',
        //   strokeWidth: 3,
        //   width: 100,
        //   height: 200,
        //   left: 10,
        //   top: 10,
        //   isRegular: true
        // });

        this.imageEditor.addImageObject('https://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-1200x423.jpg').then(objectProps => {
          // const props = this.imageEditor.getObjectProperties(objectProps.id);
          // console.log(objectProps, "image>>>>>>>>>>>>>>... id>>>>>>>>>"+objectProps.id);

          var position = this.imageEditor.getObjectPosition(objectProps.id);
          console.log(position);
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

    getImageObject() {
      const all_objects = thi.state.all_objects;
      for (let i in all_objects) {
        if (all_objects[i].type === 'image') {
          // const props = this.imageEditor.getObjectProperties(all_objects[i].id);
          // console.log(props, "image>>>>>>>>>>>>>>... id>>>>>>>>>"+all_objects[i].id);
          // var position = imageEditor.getObjectPosition(, 'left', 'top');
          // console.log(position);
        }
      }
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
      return (
        <>
          <ImageEditor ref={this.ref} {...props} />
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
          <button onClick={() => this.getImageObject.bind(this)}>
            get image props
          </button>
        </>
      );
    }
  }

  return <Story/>;
});

stories.add('Events', () => {
  class Story2 extends React.Component {
    ref = React.createRef();

    imageEditor = null;

    constructor(props) {
      super(props);
      this.state = {
        all_objects: []
      };
    }

    componentDidMount() {
      thi = this;
      this.imageEditor = this.ref.current.getInstance();
      console.log(document.getElementById('tie-btn-mask'), 'mask');
      // document.getElementById('tie-btn-mask').style.display = 'none';

      this.imageEditor.startDrawingMode('FREE_DRAWING', {
        width: 10,
        color: 'rgba(255,0,0,0.5)'
      });
    }

    uploadPic(e, removePic) {
      e.preventDefault();
      const target = e.target;
      if (removePic) {
        // createNotification("error", "we are working on it...");
      } else {
        checkValidation(e);
        const photo = document.getElementById('change_img').files[0];
        console.log(photo, 'photo....');
        if (!!e.currentTarget.value.match(/\.(.+)$/)) {
          const ext = e.currentTarget.value.match(/\.(.+)$/)[1];
          // this.props.dispatch(changeProfileState(Object.assign(this.props.profile, {[target.name]: !!target.value ? target.value : this.props.profile.photo})));
          switch (ext) {
            case 'jpg':
              return this.imageEditor.loadImageFromFile(photo).then(result => {
                console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
                console.log('new : ' + result.newWidth + ', ' + result.newHeight);
              });
            case 'jpeg':
              return this.imageEditor.loadImageFromFile(photo).then(result => {
                console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
                console.log('new : ' + result.newWidth + ', ' + result.newHeight);
              });
            case 'png':
              console.log(target.value, 'path to image....');
              return this.imageEditor.addImageObject(target.value).then(objectProps => {
                console.log(objectProps.id);
              });
            // return this.imageEditor.loadImageFromFile(photo).then(result => {
            //   console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
            //   console.log('new : ' + result.newWidth + ', ' + result.newHeight);
            // });
            default:
              alert('Only png, jpg, jpeg files supported.');
          }
        }
      }
    }

    render() {
      return (
        <>
          <ImageEditor
            ref={this.ref}
            {...props}
            onMousedown={(event, originPointer) => {
              console.log(event, 'mousedown event');
              console.log(originPointer, 'mousedown origin pointer');
              if (this.imageEditor.hasFilter('colorFilter')) {
                // get the filter details
                console.log('It has the filter. Get now the filter properties......');
                // this.imageEditor.applyFilter('colorFilter', {
                //   x: parseInt(originPointer.x, 10),
                //   y: parseInt(originPointer.y, 10)
                // });
              }
            }}
            onAddText={(pos) => {
              const {x: ox, y: oy} = pos.originPosition;
              const {x: cx, y: cy} = pos.clientPosition;
              console.log(`text position on canvas(x, y): ${ox}px, ${oy}px`);
              console.log(`text position on brwoser(x, y): ${cx}px, ${cy}px`);
            }}
            onObjectMoved={(props) => { // PARTICULAR OBJECT CHANGED AND DETAILS...
              console.log(props, 'object moved');
              console.log(props.type);
              const all_objects = thi.state.all_objects;
              for (let i in all_objects) {
                if (all_objects[i].id === props.id) {
                  all_objects[i] = props;
                }
              }
              thi.setState({
                all_objects
              });
            }}
            onUndoStackChanged={(props) => {
              console.log(props, 'onUndoStackChanged');
            }}
            onObjectActivated={(props) => {
              // some cases like cropping the object we need to update the item here..
              console.log('object activated...');
              console.log(props);
              console.log(props.type);
              console.log(props.id);
              let all_objects = thi.state.all_objects;
              if (props.type === 'cropZone') {
                // for (let i in all_objects) {
                //   if (all_objects[i].id === props.id) {
                //     all_objects[i] = props;
                //   }
                // }
              } else {
                all_objects.push(props);
              }
              thi.setState({
                all_objects
              });
            }}
            onObjectScale={(props) => {
              console.log(props, 'object scaled...');
            }}
          />
          <div>
            <input type="file" id="change_img" name="photo"
                   onChange={(e) => this.uploadPic(e, false)}/>
            <label htmlFor="change_img"
                   className="outline_field_button">Upload image via file
            </label>
          </div>
          <button>
            Upload Image via link
          </button>
        </>
      );
    }
  }

  return <Story2/>;
});
