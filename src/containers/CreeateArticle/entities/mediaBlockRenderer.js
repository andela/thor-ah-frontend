import React from "react";

const Image = props => {
  const { src } = props;
  if (!src) {
    return <img src={src} alt='article img'/>
  }
};

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === 'image') {
    media = <Image src={src} />
  }

  return media;
}

const mediaBlockRenderer = block => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      eidtable: false,
      props: {
        foo: "bar"
      }
    };
  }
};

export default mediaBlockRenderer;
