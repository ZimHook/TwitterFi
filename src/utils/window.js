export const openWindow = ({ url, name }) => {
  const top = (window.innerHeight - 600) / 2 + window.screenY;
  const left = (window.innerWidth - 600) / 2 + window.screenX;

  return window.open(
    url,
    name,
    `dialog=yes,top=${top}px,left=${left},width=${600}px,height=${600}px,popup`
  );
};