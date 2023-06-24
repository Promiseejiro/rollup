import React, { useEffect, useState, useRef, RefObject } from "react";
//import "./App.css";
type ContainerRefType = RefObject<HTMLDivElement>;

interface ResizerProps{
  resizerFunc:any;
  backgroundurl: String;
  positionX:Number;
  positionY:Number;
  backgroundWidth:Number;
  backgroundHeight:Number;
}
interface DefaultContainerInterface {
  width: Number;
  height: Number;
  left: Number;
  top: Number;
  bottom: Number;
  right: Number;
  x: Number;
  y: Number;
  
}

interface ResizerInterface {
  left: boolean;
  top: boolean;
  right: boolean;
  bottom: boolean;
  rightTop: boolean;
  leftTop: boolean;
  leftBottom: boolean;
  rightBottom: boolean;
}

interface TouchPointInterface {
  x: any;
  y: any;
}

const Resizer = ({resizerFunc,backgroundurl,positionY,positionX,backgroundWidth,backgroundHeight}:ResizerProps) => {
  // ref start
  //   const defaultSizeContainerRef = useRef(null);
  const defaultSizeContainerRef: ContainerRefType =
    useRef<HTMLDivElement>(null);

  // ref ends

  // states
  const [resizer, setResizer] = useState<ResizerInterface>({
    left: false,
    top: false,
    right: false,
    bottom: false,
    rightTop: false,
    leftTop: false,
    leftBottom: false,
    rightBottom: false,
  });

  const [stopResizing, setStopResizing] = useState(false);
  const [defaultSizeContainer, setDefaultSizeContainer] =
    useState<DefaultContainerInterface>({
      width: 100,
      height: 100,
      left: 0,
      right: 100,
      top: 0,
      bottom: 100,
      x: 0,
      y: 0,
    });

  const [moving, setMoving] = useState<boolean>(false);
  const [touchPoint, setTouchPoint] = useState<TouchPointInterface>({
    x: 0,
    y: 0,
  });

  // states end
  // function start
  const touchPointChecker = (e: any) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      var x = e.changedTouches[i].clientX;
      var y = e.changedTouches[i].clientY;
      return { x, y };
    }
  };

  const MousePoint = (e: any) => {
    var x = e.clientX;
    var y = e.clientY;
    return { x, y };
  };

  const touchStart = (e: any) => {
    setMoving(true);
    if(defaultSizeContainerRef.current){
      for (let i = 0; i < e.changedTouches.length; i++) {
      var x = e.changedTouches[i].clientX;
      var y = e.changedTouches[i].clientY;
     setTouchPoint({
      ...touchPoint,
      x: x -Number( defaultSizeContainer.width )/ 2,
      y: y - Number(defaultSizeContainer.height) / 2,
    });
    
   setDefaultSizeContainer({
      ...defaultSizeContainer,
      left: defaultSizeContainerRef.current.getBoundingClientRect().left,
      top: defaultSizeContainerRef.current.getBoundingClientRect().top,
      right: defaultSizeContainerRef.current.getBoundingClientRect().right,
      bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
    });
  }
    }
  }

  const onMouseDown = (e: any) => {
    /*  setMoving(true);
    setTouchPoint({
      ...touchPoint,
      x: MousePoint(e).x - defaultSizeContainer.width / 2,
      y: MousePoint(e).y - defaultSizeContainer.height / 2,
    });
   /* setDefaultSizeContainer({
      ...defaultSizeContainer,
      left: defaultSizeContainerRef.current.getBoundingClientRect().left,
      top: defaultSizeContainerRef.current.getBoundingClientRect().top,
      right: defaultSizeContainerRef.current.getBoundingClientRect().right,
      bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
    });*/
  };

  const touchEnd = (e: any) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      var x = e.changedTouches[i].clientX;
      var y = e.changedTouches[i].clientY;
      setMoving(false);
      if(defaultSizeContainerRef.current){
    setTouchPoint({
      ...touchPoint,
      x: x -Number( defaultSizeContainer.width )/ 2,
      y:y - Number(defaultSizeContainer.height) / 2,
    });

   setDefaultSizeContainer({
      ...defaultSizeContainer,
      left: defaultSizeContainerRef.current.getBoundingClientRect().left,
      top: defaultSizeContainerRef.current.getBoundingClientRect().top,
      right: defaultSizeContainerRef.current.getBoundingClientRect().right,
      bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
    });
  }
  }
  }
  const onMouseUp = (e: any) => {
    var x = e.clientX;
    var y = e.clientY;
    setMoving(false);
    /*  setTouchPoint({
      ...touchPoint,
      x: e.clientX - defaultSizeContainer.width / 2,
      y: e.clientY - defaultSizeContainer.height / 2,
    })
/*
    setDefaultSizeContainer({
      ...defaultSizeContainer,
      left: defaultSizeContainerRef.current.getBoundingClientRect().left,
      top: defaultSizeContainerRef.current.getBoundingClientRect().top,
      right: defaultSizeContainerRef.current.getBoundingClientRect().right,
      bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,
    });*/
  };

  const TouchMove = (e: any) => {
    console.log(moving);
    for (let i = 0; i < e.changedTouches.length; i++) {
      var x = e.changedTouches[i].clientX;
      var y = e.changedTouches[i].clientY;
      if (defaultSizeContainerRef.current) {
        if (moving) {
          setTouchPoint({
            ...touchPoint,
            x: x - Number(defaultSizeContainer.width) / 2,
            y: y - Number(defaultSizeContainer.height) / 2,
          });
          //    if (defaultSizeContainerRef.current) {
          console.log(defaultSizeContainer.left);
          setDefaultSizeContainer({
            ...defaultSizeContainer,
            x: touchPoint.x,
            y: touchPoint.y,
            left: Number(
              defaultSizeContainerRef.current.getBoundingClientRect().left
            ),
            top: defaultSizeContainerRef.current.getBoundingClientRect().top,
            right:
              defaultSizeContainerRef.current.getBoundingClientRect().right,
            bottom:
              defaultSizeContainerRef.current.getBoundingClientRect().bottom,
            //    box_left: defaultSizeContainer.left,
            //    box_top: defaultSizeContainer.height / 2,
          });

          // console.log(defaultSizeContainer.left);
          // console.log(defaultSizeContainer.top);
        }
     if (resizer.right) {
  /*    if (defaultSizeContainer.right < defaultSizeContainer.left + 20) {
        stopResizingAndMoving();
      }*/
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        width:Number( defaultSizeContainer.right) - Number( defaultSizeContainer.left),
        right: touchPoint.x,
      });
    }
    
    if (resizer.left) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        x:
         Number(defaultSizeContainer.left )-
          (Number( defaultSizeContainer.left)- touchPoint.x),
        left:
         Number( defaultSizeContainer.left )-
          (Number(defaultSizeContainer.left )- touchPoint.x),
        width:
          Number(defaultSizeContainer.width) +
          (Number(defaultSizeContainer.left) - touchPoint.x),
      });
    }
    
    if (resizer.top) {
      setTouchPoint({
        ...touchPoint,
        x:x,
        y: y,
      });

      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:
        Number (defaultSizeContainer.height) +
          (Number(defaultSizeContainer.top )- touchPoint.y),
        y: Number(defaultSizeContainer.top) - (Number(defaultSizeContainer.top) - touchPoint.y),
        top:
         Number( defaultSizeContainer.top) - (Number( defaultSizeContainer.top )- touchPoint.y),
      });
    }
    if (resizer.bottom) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:Number(defaultSizeContainer.bottom) - Number( defaultSizeContainer.top),
        bottom: touchPoint.y,
      });
    }
        
    
    if (resizer.rightBottom) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        width:Number( defaultSizeContainer.right) - Number(defaultSizeContainer.left),
        right: touchPoint.x,
        height:Number( defaultSizeContainer.bottom )- Number( defaultSizeContainer.top),
        bottom: touchPoint.y,
      });
    }
    if (resizer.leftBottom) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height: Number(defaultSizeContainer.bottom) - Number(defaultSizeContainer.top),
        bottom: touchPoint.y,
        left:
         Number( defaultSizeContainer.left )-
          (Number(defaultSizeContainer.left) - touchPoint.x),
        width:
         Number( defaultSizeContainer.width )+
          (Number(defaultSizeContainer.left )- touchPoint.x),
      });
    }

    if (resizer.leftTop) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
    setDefaultSizeContainer({
        ...defaultSizeContainer,
        left:
        Number (defaultSizeContainer.left) -
          (Number(defaultSizeContainer.left) - touchPoint.x),
        width:
         Number( defaultSizeContainer.width) +
          (Number(defaultSizeContainer.left) - touchPoint.x),
        height:
         Number( defaultSizeContainer.height) +
          (Number(defaultSizeContainer.top )- touchPoint.y),
        top:
        Number(defaultSizeContainer.top )- (Number(defaultSizeContainer.top) - touchPoint.y),
      })
    }

    if (resizer.rightTop) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:
        Number(defaultSizeContainer.height) +
          (Number(defaultSizeContainer.top) - touchPoint.y),
        top:
        Number(defaultSizeContainer.top) - (Number(defaultSizeContainer.top) - touchPoint.y),
        width: Number(defaultSizeContainer.right) - Number(defaultSizeContainer.left),
        right: touchPoint.x,
      });
    }
          }
      }
      
    resizerFunc(defaultSizeContainer.left,defaultSizeContainer.top,defaultSizeContainer.height,defaultSizeContainer.width)
    }
 
  const mouseMove = (e: any) => {
    var x = e.clientX;
    var y = e.clientY;
     if (moving) {
      setTouchPoint({
        ...touchPoint,
        x: x - Number(defaultSizeContainer.width) / 2,
        y: y- Number(defaultSizeContainer.height) / 2,
      });
      if(defaultSizeContainerRef.current){
   setDefaultSizeContainer({
        ...defaultSizeContainer,
        x: x -Number (defaultSizeContainer.width )/ 2,
        y: y -Number( defaultSizeContainer.height) / 2,
      /*  left: defaultSizeContainerRef.current.getBoundingClientRect().left,
        top: defaultSizeContainerRef.current.getBoundingClientRect().top,
        right: defaultSizeContainerRef.current.getBoundingClientRect().right,
        bottom: defaultSizeContainerRef.current.getBoundingClientRect().bottom,*/
     /*   box_left: defaultSizeContainer.left,
        box_top:Number(defaultSizeContainer.height ) / 2,*/
      });
      }
      
      
     }
    
    
    if (resizer.rightBottom) {
setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        width:Number( defaultSizeContainer.right) - Number(defaultSizeContainer.left),
        right: touchPoint.x,
        height:Number( defaultSizeContainer.bottom )- Number( defaultSizeContainer.top),
        bottom: touchPoint.y,
      });
    }
if (resizer.leftBottom) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height: Number(defaultSizeContainer.bottom) - Number(defaultSizeContainer.top),
        bottom: touchPoint.y,
        left:
         Number( defaultSizeContainer.left )-
          (Number(defaultSizeContainer.left) - touchPoint.x),
        width:
         Number( defaultSizeContainer.width )+
          (Number(defaultSizeContainer.left )- touchPoint.x),
      });
    }

    if (resizer.leftTop) {
              setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });

    setDefaultSizeContainer({
        ...defaultSizeContainer,
        left:
        Number (defaultSizeContainer.left) -
          (Number(defaultSizeContainer.left) - touchPoint.x),
        width:
         Number( defaultSizeContainer.width) +
          (Number(defaultSizeContainer.left) - touchPoint.x),
        height:
         Number( defaultSizeContainer.height) +
          (Number(defaultSizeContainer.top )- touchPoint.y),
        top:
        Number(defaultSizeContainer.top )- (Number(defaultSizeContainer.top) - touchPoint.y),
      })
    }
if (resizer.rightTop) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:
        Number(defaultSizeContainer.height) +
          (Number(defaultSizeContainer.top) - touchPoint.y),
        top:
        Number(defaultSizeContainer.top) - (Number(defaultSizeContainer.top) - touchPoint.y),
        width: Number(defaultSizeContainer.right) - Number(defaultSizeContainer.left),
        right: touchPoint.x,
      });
    }
    if (resizer.right) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        width:Number( defaultSizeContainer.right) - Number( defaultSizeContainer.left),
        right: touchPoint.x,
      });

    }
if (resizer.left) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        x:
         Number(defaultSizeContainer.left )-
          (Number( defaultSizeContainer.left)- touchPoint.x),
        left:
         Number( defaultSizeContainer.left )-
          (Number(defaultSizeContainer.left )- touchPoint.x),
        width:
          Number(defaultSizeContainer.width) +
          (Number(defaultSizeContainer.left) - touchPoint.x),
      });
    }
    if (resizer.bottom) {
      setTouchPoint({
        ...touchPoint,
        x: x,
        y: y,
      });
      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:Number(defaultSizeContainer.bottom) - Number( defaultSizeContainer.top),
        bottom: touchPoint.y,
      });
    }if (resizer.top) {
      setTouchPoint({
        ...touchPoint,
        x:x,
        y: y,
      });

      setDefaultSizeContainer({
        ...defaultSizeContainer,
        height:
        Number (defaultSizeContainer.height) +
          (Number(defaultSizeContainer.top )- touchPoint.y),
        y: Number(defaultSizeContainer.top) - (Number(defaultSizeContainer.top) - touchPoint.y),
        top:
         Number( defaultSizeContainer.top) - (Number( defaultSizeContainer.top )- touchPoint.y),
      });
    }
  };
  const stopResizingAndMoving = () => {
    setResizer({
      ...resizer,
      left: false,
      top: false,
      bottom: false,
      right: false,
      rightBottom: false,
      leftBottom: false,
      leftTop: false,
      rightTop: false,
    });
  };

  // useEffect(() => {}, [defaultSizeContainer]);
  return (
    <div
      onMouseMove={mouseMove}
      onTouchMove={TouchMove}
      onMouseUp={stopResizingAndMoving}
      onTouchEnd={stopResizingAndMoving}
      onDrag={(e) => {
        e.preventDefault();
      }}
      style={{
        position:"absolute",
        backgroundImage:`url("${backgroundurl}")`
      }}
    >
      <div
        className="defaultSizeContainer"
        style={{
          position:"absolute",
          width: `${defaultSizeContainer.width}px`,
          height: `${defaultSizeContainer.height}px`,
          left: `${defaultSizeContainer.x}px`,
          top: `${defaultSizeContainer.y}px`,
          opacity: 1,
          backgroundPosition:"59px 69px",
          backgroundSize:"360px 360px"
        }}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={defaultSizeContainerRef}
      ></div>
      <div
        className="element-being-resized"
        onTouchStart={touchStart}
        style={{
          position: "absolute",
          width: `${defaultSizeContainer.width}px`,
          height: `${defaultSizeContainer.height}px`,
          left: `${defaultSizeContainer.x}px`,
          top: `${defaultSizeContainer.y}px`,
          backgroundImage:`url("${backgroundurl}")`,
        backgroundPosition:`${positionX}px ${positionY}px`,
          backgroundSize:`${backgroundWidth}px ${backgroundHeight}px`
        }}
        onDrag={(e) => e.preventDefault()}
      ></div>
      {/* right and bottom */}
      <div
        className="box-resizer "
        style={{
        position: "absolute",
          width: "10px",
          height: "10px",
          border: "2px solid red",
     left: `${Number(defaultSizeContainer.right) - 6}px`,
      top: `${Number(defaultSizeContainer.bottom )- 6}px`,
        }}
   onTouchStart={() => {
     setResizer({ ...resizer, rightBottom: true });
        }}
    onTouchEnd={() => {
    setResizer({ ...resizer, rightBottom: false });
        }}
        onMouseDown={() => {
     setResizer({ ...resizer, rightBottom: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, rightBottom: false });
        }}
      ></div>
      {/* bottom-left */}
      <div
        className="box-resizer"
        style={{
        position: "absolute",
          width: "10px",
          height: "10px",
          border: "2px solid red",
          left: `${Number(defaultSizeContainer.left )- 6}px`,
          top: `${Number(defaultSizeContainer.bottom )- 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, leftBottom: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, leftBottom: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, leftBottom: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, leftBottom: false });
        }}
      ></div>
      {/* top-left  */}
      <div
        className="box-resizer"  
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          border: "2px solid red",
          left: `${Number(defaultSizeContainer.left )- 6}px`,
          top: `${Number(defaultSizeContainer.top) - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, leftTop: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, leftTop: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, leftTop: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, leftTop: false });
        }}
      ></div>
      {/* top-right box*/}
      <div
        className="box-resizer"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          border: "2px solid red",
          left: `${Number(defaultSizeContainer.right )- 6}px`,
          top: `${Number(defaultSizeContainer.top)- 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, rightTop: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, rightTop: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, rightTop: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, rightTop: false });
        }}
      ></div>
      {/*right resizer box */}
      <div
        className="box-resizer "
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          border: "2px solid red",
          left: `${Number(defaultSizeContainer.right) - 6}px`,
          top: `${
            Number(defaultSizeContainer.top) +
            Number(defaultSizeContainer.height) / 2
          }px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, right: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, right: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, right: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, right: false });
        }}
      ></div>

      {/* left resizer box*/}
      <div
        className="box-resizer "
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          border: `2px solid blue`,
          left: `${Number(defaultSizeContainer.left) - 6}px`,
          top: `${
            Number(defaultSizeContainer.top) +
            Number(defaultSizeContainer.height) / 2.5
          }px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, left: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, left: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, left: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, left: false });
        }}
      ></div>
      {/* top resizer box */}
      <div
        className="box-resizer"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          border: "2px solid red",
          left: `${
            Number(defaultSizeContainer.left) +
            Number(defaultSizeContainer.width) / 2.1
          }px`,
          top: `${Number(defaultSizeContainer.top) - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, top: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, top: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, top: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, top: false });
        }}
      ></div>
      {/* bottom  */}
      <div
        className="box-resizer"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          border: "2px solid red",
          left: `${
            Number(defaultSizeContainer.left) +
            Number(defaultSizeContainer.width) / 2.1
          }px`,
          top: `${Number(defaultSizeContainer.bottom) - 6}px`,
        }}
        onTouchStart={() => {
          setResizer({ ...resizer, bottom: true });
        }}
        onTouchEnd={() => {
          setResizer({ ...resizer, bottom: false });
        }}
        onMouseDown={() => {
          setResizer({ ...resizer, bottom: true });
        }}
        onMouseUp={() => {
          setResizer({ ...resizer, bottom: false });
        }}
      ></div>
    </div>
  );
};

export default Resizer;