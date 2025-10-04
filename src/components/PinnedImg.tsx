interface PinnedImgProps {
  src: string;
  alt?: string;
}

const PinnedImg = ({ src, alt }: PinnedImgProps) => {
  return <img src={src} alt={alt} />;
};
export default PinnedImg;
