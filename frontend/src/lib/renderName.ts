interface RenderProps {
  text: string;
  sliceLength?: number;
}

const renderName = ({ text, sliceLength = 20 }: RenderProps): string => {
  if (text.length > 20) {
    const cutText = text.slice(0, sliceLength).trim();
    return cutText + "...";
  }
  return text;
};

export default renderName;
