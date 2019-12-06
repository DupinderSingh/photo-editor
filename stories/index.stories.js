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
      path: 'https://cors-anywhere.herokuapp.com/https://www.bigfootdigital.co.uk/wp-content/uploads/2017/09/Loading-Please-Wait-Written-on-Blackboard.jpg',
      name: 'sampleImage2'
    },
    initMenu: 'shape',
    uiSize: {
      height: '803px', // frame size
      width: '1125px'
    },
    menuBarPosition: 'bottom'
  },
  cssMaxWidth: 725, // image size
  cssMaxHeight: 725
};
// "frameRatio":"(0.0, 0.0, 0.5,0.7)",
//   "positionRatio":"(0.75, 0.65)"

// 287.5, 402.5
// 431.25, 373.75

// 350, 490
// 525, 455
//


let thi = null;

//stories.add('Include default UI', () => <ImageEditor {...props} />);


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

    getCookie(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    componentDidMount() {
      thi = this;
      this.imageEditor = this.ref.current.getInstance();
      console.log(document.getElementsByClassName('tui-image-editor-header-logo')[0], 'textt');
      document.getElementsByClassName('tui-image-editor-header-logo')[0].style.display = 'none';
      console.log(document.getElementById('tie-btn-mask'), 'mask');
      // document.getElementById('tie-btn-mask').style.display = 'none';
      this.imageEditor.startDrawingMode('FREE_DRAWING', {
        width: 10,
        color: 'rgba(255,0,0,0.5)'
      });

      console.log('draw triangle..');
      this.imageEditor.setDrawingShape('triangle', { // When resizing, the shape keep the 1:1 ratio
        width: 100,
        height: 100,
        isRegular: true
      });
      window.setTimeout(() => {
        const backgroundType = this.getCookie('backgroundType');
        const background = this.getCookie('background');
        if (!!backgroundType && !!background) {
          if (backgroundType === 'color') {
            this.imageEditor.loadImageFromURL('https://cors-anywhere.herokuapp.com/https://www.solidbackgrounds.com/images/950x350/950x350-white-solid-color-background.jpg', 'white').then(result => {
              this.imageEditor.applyFilter('blendColor', {'color': background});
              console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
              console.log('new : ' + result.newWidth + ', ' + result.newHeight);
            });
          } else {
            this.imageEditor.loadImageFromURL('https://cors-anywhere.herokuapp.com/https://beautybid.iapplabz.co.in/uploads/' + background, background).then(result => {
              //   this.imageEditor.applyFilter('blendColor',{'color': background});
              //   console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
              //   console.log('new : ' + result.newWidth + ', ' + result.newHeight);
            });
          }
        }

        this.imageEditor.addText('Welcome to Meme editor', {
          styles: {
            fill: '#000',
            fontSize: 20,
            fontWeight: 'bold'
          },
          position: {
            x: 10,
            y: 10
          }
        }).then(objectProps => {
          console.log(objectProps.id);
        });

       // // const imageWidth = 400;
        //// const imageHeight = 500;
        // const imageWidth = 132.37659746491698;
        // const imageHeight = 160.17710639972515;
        // const frameWidth = 600;
        // const frameHeight = 550;
        //
        // const widthRatioFrameWrtImage = imageWidth / frameWidth;
        // const heightRatioFrameWrtImage = imageHeight / frameHeight;
        // console.log((Math.floor(widthRatioFrameWrtImage * 100) / 100), (Math.floor(heightRatioFrameWrtImage * 100) / 100), 'frame ratio wrt image....');
        //
        // // getting the centered position...... from image
        //
        // // y coordinates = topHeight + (imageHeight / 2);
        // // x coordinates = leftWidth + (imageWidth / 2);
        //
        // // const imageLeft = this.imageEditor._graphics.canvasImage.left;
        // // const imageTop = this.imageEditor._graphics.canvasImage.top;
        // const imageLeft = 361.4519145865762;
        // const imageTop = 608.8242590157134;
        //
        // console.log(this.imageEditor._graphics, 'graphics....');
        // const imageCenterYCordinates = imageTop + (imageHeight / 2);
        // const imageCenterXCordinates = imageLeft + (imageWidth / 2);
        //
        // const centerCordinatesFromCenterOfImage = imageCenterXCordinates / imageCenterYCordinates;
        // console.log((Math.floor(centerCordinatesFromCenterOfImage * 100) / 100), 'center coordinates from image...');
        //
        // // ---------------------------------------------------------------
        // // getting the centered position...... from frame
        //
        // const frameCenterYCordinates = imageCenterYCordinates / frameHeight;
        // const frameCenterXCordinates = imageCenterXCordinates / frameWidth;
        //
        // console.log((Math.floor(frameCenterXCordinates * 100) / 100), (Math.floor(frameCenterYCordinates * 100) / 100), 'center coordinates from frame...');
        // console.log(this.imageEditor.getCanvasSize(), 'get canvas size....');
      }, 2000);

    }

    uploadimageviaLink() {
      var tenure = prompt('Please enter url link');
      if (tenure != null && tenure !== '') {
        this.imageEditor.loadImageFromURL(tenure, 'upload-image-via-link').then(result => {
          console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
          console.log('new : ' + result.newWidth + ', ' + result.newHeight);
        })
          .catch((err) => {
            alert('error');
          });
      } else {
        // user cancelled
        if (tenure === '') {
          alert('this field is required');
          this.uploadimageviaLink();
        }
      }
    }

    uploadPic(e, removePic) { // also add photo to result
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
                console.log('old : ' + result.oldWidth + ', ' + result.oldHeight); // old frame size
                console.log('new : ' + result.newWidth + ', ' + result.newHeight); // new frame size
              });
            case 'jpeg':
              return this.imageEditor.loadImageFromFile(photo).then(result => {
                console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
                console.log('new : ' + result.newWidth + ', ' + result.newHeight);
              });
            case 'png':
              console.log(target.value, 'path to image....');
              // return this.imageEditor.addImageObject(target.value).then(objectProps => {
              //   console.log(objectProps.id);
              // });
              return this.imageEditor.loadImageFromFile(photo).then(result => {
                console.log(result, 'resu');
              });
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
              console.log(this.imageEditor, 'image editor.');
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
            onTextEditing={() => {
              console.log('textediting....');
            }}
            onUndoStackChanged={(props) => {
              console.log(props, 'onUndoStackChanged');
            }}
            onObjectActivated={(props) => {
              // some cases like cropping the object we need to update the item here..
              console.log(props, 'object activated...');
              console.log(props);
              console.log(props.type);
              console.log(props.id);
              let all_objects = thi.state.all_objects;
              const positions = this.imageEditor.getObjectPosition(props.id, 'left', 'top');
              props.left = positions.x + (props.width / 2);
              props.top = positions.y + (props.height / 2);
              console.log(props.left);
              let isExist = false;
              for (let i in all_objects) {
                if (all_objects[i].id === props.id) {
                  isExist = true;
                  all_objects[i] = props;
                }
              }
              if (!isExist) {
                all_objects.push(props);
              }
              thi.setState({
                all_objects
              });
            }}
            onObjectScaled={(props) => {
              console.log(props, 'object scaled...');
              console.log(props.type);
              const all_objects = thi.state.all_objects;
              for (let i in all_objects) {
                if (all_objects[i].id === props.id) {
                  const positions = this.imageEditor.getObjectPosition(props.id, 'left', 'top');
                  console.log(positions, 'positions');
                  /*console.log(this.imageEditor.getObjectPosition(props.id, 'left', 'top'), 'scaled object props');*/
                  let newProps = props;
                  newProps.left = positions.x + (props.width / 2);
                  newProps.top = positions.y + (props.height / 2);
                  console.log(newProps, 'newProps...');
                  let shapeLeft = newProps.left - (newProps.width / 2); // object left
                  let shapeTop = newProps.top - (newProps.height / 2); // object top
                  console.log(shapeLeft, 'shapeLeft', shapeTop, 'shapeTop');
                  all_objects[i] = newProps;
                }
              }
              thi.setState({
                all_objects
              });
            }}

            onRedoStackChanged={(length) => {
              console.log(length);
            }}
          />
          <div>
            <input type="file" id="change_img" name="photo"
                   onChange={(e) => this.uploadPic(e, false)}/>
            <label htmlFor="change_img"
                   className="outline_field_button">Upload image via file
            </label>
          </div>
          <button onClick={this.uploadimageviaLink.bind(this)}>
            Upload Image via link
          </button>
        </>
      );
    }
  }

  return <Story2/>;
});
