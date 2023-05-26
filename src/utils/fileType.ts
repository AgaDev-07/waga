export default function (fileU: string) {
	const file = fileU.toLowerCase();
	const type = file.split('.').pop();
  return extToContentType(type);
}
export function extToContentType(ext: string) {
	if (ext === 'png') return 'image/png';
	else if (ext === 'jpg') return 'image/jpg';
	else if (ext === 'jpeg') return 'image/jpeg';
	else if (ext === 'gif') return 'image/gif';
	else if (ext === 'ico') return 'image/x-icon';
	else if (ext === 'svg') return 'image/svg+xml';
	else if (ext === 'webp') return 'image/webp';
	else if (ext === 'webm') return 'video/webm';
	else if (ext === 'mp4') return 'video/mp4';
	else if (ext === 'mp3') return 'audio/mpeg';
	else if (ext === 'ogg') return 'audio/ogg';
	else if (ext === 'otf') return 'font/otf';
	else if (ext === 'html') return 'text/html';
	else if (ext === 'css') return 'text/css';
	else if (ext === 'txt') return 'text/plain';
	else if (ext === 'js') return 'application/javascript';
	else if (ext === 'json') return 'application/json';
	else if (ext === 'pdf') return 'application/pdf';
	else if (ext === 'zip') return 'application/zip';
	else if (ext === 'gz') return 'application/gzip';
	else return 'text/plain';
}

export function contentTypeToExt(contentType: string) {
  if (contentType === 'image/png') return 'png';
  else if (contentType === 'image/jpg') return 'jpg';
  else if (contentType === 'image/jpeg') return 'jpeg';
  else if (contentType === 'image/gif') return 'gif';
  else if (contentType === 'image/x-icon') return 'ico';
  else if (contentType === 'image/svg+xml') return 'svg';
  else if (contentType === 'image/webp') return 'webp';
  else if (contentType === 'video/webm') return 'webm';
  else if (contentType === 'video/mp4') return 'mp4';
  else if (contentType === 'audio/mpeg') return 'mp3';
  else if (contentType === 'audio/ogg') return 'ogg';
  else if (contentType === 'font/otf') return 'otf';
  else if (contentType === 'text/html') return 'html';
  else if (contentType === 'text/css') return 'css';
  else if (contentType === 'text/plain') return 'txt';
  else if (contentType === 'application/javascript') return 'js';
  else if (contentType === 'application/json') return 'json';
  else if (contentType === 'application/pdf') return 'pdf';
  else if (contentType === 'application/zip') return 'zip';
  else if (contentType === 'application/gzip') return 'gz';
  else return 'txt';
}
