import { useState, useEffect, useRef } from 'react';
import useTheme from '../../../hooks/useTheme';
import './IconsShowcase.scss';

interface Icon {
  id: string;
  name: string;
  category: 'navigation' | 'actions' | 'objects' | 'ui';
  interactive?: boolean;
}

const icons: Icon[] = [
  { id: 'cart', name: 'Cart', category: 'objects' },
  { id: 'account', name: 'Account', category: 'navigation' },
  { id: 'shop', name: 'Store', category: 'objects' },
  { id: 'page', name: 'Document', category: 'objects' },
  { id: 'file', name: 'File', category: 'objects' },
  { id: 'folder', name: 'Folder', category: 'objects' },
  { id: 'trash', name: 'Delete', category: 'actions' },
  { id: 'ladder', name: 'Ladder', category: 'objects' },
  { id: 'container', name: 'Dashboard', category: 'objects' },
  { id: 'star', name: 'Star', category: 'ui', interactive: true },
  { id: 'heart', name: 'Heart', category: 'ui', interactive: true },
  { id: 'home', name: 'Home', category: 'navigation' },
  { id: 'search', name: 'Search', category: 'navigation' },
  { id: 'menu', name: 'Menu', category: 'ui', interactive: true },
  { id: 'settings', name: 'Settings', category: 'ui', interactive: true },
  { id: 'bell', name: 'Bell', category: 'ui', interactive: true },
  { id: 'message', name: 'Message', category: 'actions' },
  { id: 'phone', name: 'Phone', category: 'actions' },
  { id: 'email', name: 'Email', category: 'actions' },
  { id: 'camera', name: 'Camera', category: 'objects' },
  { id: 'image', name: 'Image', category: 'objects' },
  { id: 'download', name: 'Download', category: 'actions' },
  { id: 'upload', name: 'Upload', category: 'actions' },
  { id: 'data', name: 'Data', category: 'actions' },
  { id: 'edit', name: 'Edit', category: 'actions' },
  { id: 'save', name: 'Save', category: 'actions' },
  { id: 'check', name: 'Checkmark', category: 'ui' },
  { id: 'close', name: 'Close', category: 'ui' },
  { id: 'plus', name: 'Plus', category: 'actions' },
  { id: 'minus', name: 'Minus', category: 'actions' },
  { id: 'bookmark', name: 'Bookmark', category: 'ui' },
  { id: 'tag', name: 'Tag', category: 'ui' },
  { id: 'lock', name: 'Lock', category: 'ui', interactive: true },
  { id: 'unlock', name: 'Unlock', category: 'ui', interactive: true },
  { id: 'eye', name: 'Eye', category: 'ui', interactive: true },
  { id: 'calendar', name: 'Calendar', category: 'ui' },
  { id: 'clock', name: 'Clock', category: 'ui' },
  { id: 'location', name: 'Location', category: 'navigation' },
  { id: 'arrow-up', name: 'Up Arrow', category: 'navigation' },
  { id: 'arrow-down', name: 'Down Arrow', category: 'navigation' },
  { id: 'arrow-left', name: 'Left Arrow', category: 'navigation' },
  { id: 'arrow-right', name: 'Right Arrow', category: 'navigation' },
  { id: 'arrow-down-left', name: 'Up Left Arrow', category: 'navigation' },
  { id: 'arrow-up-left', name: 'Up Right Arrow', category: 'navigation' },
  { id: 'arrow-down-right', name: 'Down Left Arrow', category: 'navigation' },
  { id: 'arrow-up-right', name: 'Down Right Arrow', category: 'navigation' },
  { id: 'arrow-corner-down-left', name: 'Corner Up Left', category: 'navigation' },
  { id: 'arrow-corner-down-right', name: 'Corner Up Right', category: 'navigation' },
  { id: 'arrow-corner-up-left', name: 'Corner Down Left', category: 'navigation' },
  { id: 'arrow-corner-up-right', name: 'Corner Down Right', category: 'navigation' },
  { id: 'arrow-corner-left-up', name: 'Corner Left Down', category: 'navigation' },
  { id: 'arrow-corner-left-down', name: 'Corner Left Up', category: 'navigation' },
  { id: 'arrow-corner-right-up', name: 'Corner Right Down', category: 'navigation' },
  { id: 'arrow-corner-right-down', name: 'Corner Right Up', category: 'navigation' },
  { id: 'chevron-up', name: 'Chevron Up', category: 'navigation', interactive: true },
  { id: 'chevron-down', name: 'Chevron Down', category: 'navigation', interactive: true },
  { id: 'chevron-left', name: 'Chevron Left', category: 'navigation', interactive: true },
  { id: 'chevron-right', name: 'Chevron Right', category: 'navigation', interactive: true },
  { id: 'refresh-ccw', name: 'Rotate Left', category: 'actions' },
  { id: 'refresh-cw', name: 'Rotate Right', category: 'actions' },
  { id: 'refresh-cw-alt', name: 'Refresh', category: 'actions' },
  { id: 'arrow-left-right', name: 'Swap', category: 'actions' },
  { id: 'arrow-right-page', name: 'Next', category: 'actions' },
  { id: 'arrow-left-page', name: 'Previous', category: 'actions' },
  { id: 'download-alt', name: 'Download', category: 'actions' },
  { id: 'upload-alt', name: 'Upload', category: 'actions' },
  { id: 'cloud-download', name: 'Cloud Upload', category: 'actions' },
  { id: 'cloud-upload', name: 'Cloud Download', category: 'actions' },
  { id: 'maximize', name: 'Minimize', category: 'ui' },
  { id: 'minimize', name: 'Maximize', category: 'ui' },
  { id: 'trending-down', name: 'Trending Down', category: 'ui' },
  { id: 'trending-up', name: 'Trending Up', category: 'ui' },
  { id: 'move', name: 'Move', category: 'ui' },
  { id: 'external-link', name: 'External Link', category: 'actions' },
  { id: 'grid', name: 'Grid', category: 'ui' },
  { id: 'loader', name: 'Loading', category: 'ui' },
  { id: 'alert-octagon', name: 'Alert', category: 'ui' },
  { id: 'alert-triangle', name: 'Warning', category: 'ui' },
  { id: 'help-circle', name: 'Help', category: 'ui' },
  { id: 'hexagon', name: 'Hexagon', category: 'ui' },
  { id: 'octagon', name: 'Octagon', category: 'ui' },
  { id: 'triangle', name: 'Triangle', category: 'ui' },
  { id: 'circle', name: 'Circle', category: 'ui' },
  { id: 'square', name: 'Square', category: 'ui' },
  { id: 'check-circle', name: 'Check Circle', category: 'ui' },
  { id: 'check-square', name: 'Check Square', category: 'ui' },
  { id: 'x-circle', name: 'Disabled', category: 'ui' },
  { id: 'edit-corner', name: 'Edit', category: 'actions' },
  { id: 'filter', name: 'Filter', category: 'ui' },
  { id: 'flag', name: 'Flag', category: 'ui' },
  { id: 'message-circle', name: 'Chat', category: 'actions' },
  { id: 'moon', name: 'Moon', category: 'ui' },
  { id: 'thumbs-up', name: 'Like', category: 'ui', interactive: true },
  { id: 'thumbs-down', name: 'Dislike', category: 'ui', interactive: true },
  { id: 'shopping-bag', name: 'Shopping Bag', category: 'objects' },
  { id: 'basketball', name: 'Basketball', category: 'objects' },
  { id: 'hockey-puck', name: 'Hockey Puck', category: 'objects' },
  { id: 'football', name: 'Football', category: 'objects' },
  { id: 'baseball', name: 'Baseball', category: 'objects' },
  { id: 'videogames', name: 'Videogames', category: 'objects' },
  { id: 'compass', name: 'Compass', category: 'navigation' },
  { id: 'card', name: 'Card', category: 'objects' },
  { id: 'play', name: 'Play', category: 'actions' },
  { id: 'pause', name: 'Pause', category: 'actions' },
  { id: 'play-circle', name: 'Play', category: 'actions' },
  { id: 'stop-circle', name: 'Stop', category: 'actions' },
  { id: 'stop-square', name: 'Stop', category: 'actions' },
  { id: 'skip-back', name: 'Skip Back', category: 'actions' },
  { id: 'skip-forward', name: 'Skip Forward', category: 'actions' },
  { id: 'step-back', name: 'Step Back', category: 'actions' },
  { id: 'step-forward', name: 'Step Forward', category: 'actions' },
  { id: 'volume-up', name: 'Volume', category: 'actions' },
  { id: 'volume-off', name: 'Mute', category: 'actions' },
  { id: 'music', name: 'Music', category: 'actions' },
  { id: 'video-off', name: 'Video Off', category: 'actions' },
  { id: 'video-play', name: 'Video', category: 'actions', interactive: true },
  { id: 'dice', name: 'Bowling Ball', category: 'ui' },
  { id: 'volleyball', name: 'Volleyball', category: 'actions' },
  { id: 'code', name: 'Bicycle', category: 'actions' },
  { id: 'link', name: 'Dumbbell', category: 'actions' },
  { id: 'paint', name: 'Ping Pong', category: 'actions' },
];

const getIconSVGCode = (iconId: string): string => {
  const iconMap: Record<string, string> = {
    'account': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />',
    'home': '<path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" /><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />',
    'search': '<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />',
    'location': '<path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />',
    'arrow-up': '<path d="M12 19V6M5 12l7-7 7 7" />',
    'arrow-down': '<path d="M12 5v13M5 12l7 7 7-7" />',
    'arrow-left': '<path d="M19 12H6M12 5l-7 7 7 7" />',
    'arrow-right': '<path d="M5 12h13M12 5l7 7-7 7" />',
    'arrow-down-left': '<path d="M17 17L7.8 7.7M7 17V7h10" />',
    'arrow-up-left': '<path d="M7 17l9.2-9.2M17 17V7H7" />',
    'arrow-down-right': '<path d="M17 7l-9.2 9.2M7 7v10h10" />',
    'arrow-up-right': '<path d="M7 7l9.2 9.2M17 7v10H7" />',
    'arrow-corner-down-left': '<path d="M10 16l-6-6 6-6" /><path d="M20 21v-7a4 4 0 0 0-4-4H5" />',
    'arrow-corner-down-right': '<path d="M14 16l6-6-6-6" /><path d="M4 21v-7a4 4 0 0 1 4-4h11" />',
    'arrow-corner-up-left': '<path d="M10 9l-6 6 6 6" /><path d="M20 4v7a4 4 0 0 1-4 4H5" />',
    'arrow-corner-up-right': '<path d="M14 9l6 6-6 6" /><path d="M4 4v7a4 4 0 0 0 4 4h11" />',
    'arrow-corner-left-up': '<path d="M15 14l-6 6-6-6" /><path d="M20 4h-7a4 4 0 0 0-4 4v11" />',
    'arrow-corner-left-down': '<path d="M15 10L9 4l-6 6" /><path d="M20 20h-7a4 4 0 0 1-4-4V5" />',
    'arrow-corner-right-up': '<path d="M9 14l6 6 6-6" /><path d="M4 4h7a4 4 0 0 1 4 4v11" />',
    'arrow-corner-right-down': '<path d="M9 10l6-6 6 6" /><path d="M4 20h7a4 4 0 0 0 4-4V5" />',
    'chevron-up': '<path d="M18 15l-6-6-6 6" />',
    'chevron-down': '<path d="M6 9l6 6 6-6" />',
    'chevron-left': '<path d="M15 18l-6-6 6-6" />',
    'chevron-right': '<path d="M9 18l6-6-6-6" />',
    'refresh-ccw': '<path d="M2.5 2v6h6M21.5 22v-6h-6" /><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" />',
    'refresh-cw': '<path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />',
    'refresh-cw-alt': '<path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />',
    'arrow-left-right': '<path d="M17 2.1l4 4-4 4" /><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" /><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />',
    'arrow-right-page': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />',
    'arrow-left-page': '<path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />',
    'download-alt': '<path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />',
    'upload-alt': '<path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />',
    'cloud-download': '<path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" /><path d="M16 16l-4-4-4 4" />',
    'cloud-upload': '<path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8M12 19.8V12M16 17l-4 4-4-4" />',
    'maximize': '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />',
    'minimize': '<path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />',
    'trending-down': '<path d="M20.2 17.2l-7.7-7.7-4 4-5.7-5.7" /><path d="M15 18h6v-6" />',
    'trending-up': '<path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" /><path d="M15 7h6v6" />',
    'move': '<path d="M5.2 9l-3 3 3 3M9 5.2l3-3 3 3M15 18.9l-3 3-3-3M18.9 9l3 3-3 3M3.3 12h17.4M12 3.2v17.6" />',

    'cart': '<circle cx="10" cy="20.5" r="1" /><circle cx="18" cy="20.5" r="1" /><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />',
    'shop': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />',
    'page': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />',
    'file': '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" />',
    'folder': '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />',
    'ladder': '<path d="M3 12h18M3 6h18M3 18h18" /><path d="M6 3v18M18 3v18" />',
    'container': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />',
    'camera': '<g transform="translate(2 3)"><path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z" /><circle cx="10" cy="10" r="4" /></g>',
    'image': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />',

    'basketball': '<path fill-rule="evenodd" d="M7.133 2.067c-1.066.133-2.066.6-2.933 1.266L6.067 5.2c.666-.867 1-1.933 1.066-3.133ZM8 7.2l3.8-3.867C10.8 2.467 9.533 2.067 8.267 2c0 1.533-.534 2.933-1.4 4.067L8 7.2Zm-4.667-3C2.6 5.067 2.2 6.067 2 7.133c1.2-.066 2.333-.4 3.2-1.066L3.333 4.2Zm6.6 4.933c1.067-.866 2.534-1.4 4.067-1.4-.067-1.266-.533-2.466-1.333-3.533L8.8 8l1.133 1.133ZM8 8.8l-3.8 3.867c1 .866 2.267 1.266 3.533 1.333 0-1.533.534-2.933 1.4-4.067L8 8.8Zm4.667 3C13.4 10.933 13.8 9.933 14 8.867c-1.2.066-2.333.4-3.2 1.066l1.867 1.867Zm-6.6-4.933C5 7.733 3.533 8.267 2 8.267c.067 1.266.533 2.466 1.333 3.533l3.8-3.8-1.066-1.133Zm2.8 7.066c1.066-.133 2.066-.6 2.933-1.333l-1.867-1.867c-.666.934-1 2-1.066 3.2Z" />',
    'hockey-puck': '<path fill-rule="evenodd" d="M2 5.6c0-1.267 2.667-2.267 6-2.267s6 1 6 2.267-2.667 2.267-6 2.267C4.667 7.8 2 6.8 2 5.6Zm0 1.933v2.6C2 11.4 4.667 12.4 8 12.4s6-1 6-2.267v-2.6c-2.667 1.934-9.333 1.934-12 0Z" />',
    'football': '<path fill-rule="evenodd" d="M13.667 3.267a1.32 1.32 0 0 0-.934-.934A10.582 10.582 0 0 0 10.2 2L14 5.8c0-1.067-.2-1.933-.333-2.533ZM2.333 12.733c.134.467.467.8.934.934C3.8 13.8 4.733 14 5.8 14L2 10.2c0 1.067.2 1.933.333 2.533Zm-.2-4.066 5.2 5.266c3.2-.466 6-2.866 6.6-6.533L8.667 2.067c-3.2.466-6 2.933-6.534 6.6Zm7.667-3a.203.203 0 0 1 .267 0l.266.266c.067.067.067.2 0 .267l-.666.667.666.666c.067.067.067.2 0 .267l-.266.267a.203.203 0 0 1-.267 0L9.133 7.4l-.6.6.667.667c.067.066.067.2 0 .266l-.267.267a.203.203 0 0 1-.266 0L8 8.533l-.533.534.666.666c.067.067.067.2 0 .267l-.266.267a.203.203 0 0 1-.267 0L6.933 9.6l-.666.667a.203.203 0 0 1-.267 0L5.733 10a.203.203 0 0 1 0-.267l.667-.666-.667-.667a.203.203 0 0 1 0-.267L6 7.867a.203.203 0 0 1 .267 0l.666.666L7.467 8 6.8 7.333a.203.203 0 0 1 0-.266l.267-.267a.203.203 0 0 1 .266 0L8 7.467l.533-.534-.666-.666a.203.203 0 0 1 0-.267l.266-.267a.203.203 0 0 1 .267 0l.667.667.733-.733Z" />',
    'baseball': '<path fill-rule="evenodd" d="m10.933 10.6.667-.333c.267.533.6 1.066 1.067 1.466C13.467 10.667 14 9.4 14 8s-.467-2.733-1.333-3.733c-.4.4-.8.866-1.067 1.466l-.667-.333c.334-.6.734-1.2 1.2-1.667A5.85 5.85 0 0 0 8 2c-1.6 0-3.067.667-4.133 1.667.466.466.866 1.066 1.2 1.666l-.667.334c-.267-.534-.667-1-1.067-1.4C2.467 5.267 2 6.6 2 8s.467 2.733 1.333 3.733c.467-.4.8-.933 1.067-1.466l.667.333A6.441 6.441 0 0 1 3.8 12.333C4.933 13.333 6.4 14 8 14s3.067-.667 4.133-1.667c-.466-.533-.933-1.066-1.2-1.733ZM5.4 9.867 4.667 9.6C5 8.467 5 7.333 4.667 6.333l.733-.266a6.691 6.691 0 0 1 0 3.8Zm5.2-3.734.733.2c-.333 1-.4 2.134 0 3.267l-.733.267a6.456 6.456 0 0 1 0-3.734Z" />',
    'videogames': '<path fill-rule="evenodd" d="M11.617 7.533c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4Zm-.8-.8c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4Zm0 1.667c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4Zm-.8-.867c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4ZM4.817 8c-.4 0-.8-.4-.8-.8 0-.467.4-.8.8-.8.466 0 .8.4.8.8.066.4-.334.8-.8.8Zm8.666-.333C13.083 6.533 12.55 5.6 12.017 5c-.534-.6-1.334-.867-2.067-.6-.067 0-.133.067-.2.067-.467.266-1.067.4-1.733.4-.6 0-1.2-.134-1.734-.334-.066-.066-.133-.066-.2-.066-.666-.267-1.4-.067-1.933.466-.533.534-1.2 1.534-1.6 2.734-.733 2-.733 3.866 0 4.133.6.2 1.467-.667 2.2-2.067.067-.133.2-.266.333-.266h5.8c.134 0 .334.133.334.266.666 1.4 1.6 2.267 2.2 2.067.8-.267.8-2.067.066-4.133Z" />',

    'trash': '<polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />',
    'message': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />',
    'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />',
    'email': '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />',
    'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />',
    'data': '<circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />',
    'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />',
    'edit': '<polygon points="16 3 21 8 8 21 3 21 3 16 16 3" />',
    'save': '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />',
    'plus': '<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />',
    'minus': '<line x1="5" y1="12" x2="19" y2="12" />',

    'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />',
    'heart': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />',
    'flag': '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />',
    'moon': '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />',
    'thumbs-up': '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />',
    'thumbs-down': '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />',
    'shopping-bag': '<path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0" />',
    'compass': '<circle cx="12" cy="12" r="10" /><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z" />',
    'card': '<path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" /><path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />',
    'menu': '<line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />',
    'settings': '<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />',
    'bell': '<path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />',
    'check': '<polyline points="20 6 9 17 4 12" />',
    'close': '<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />',
    'bookmark': '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />',
    'tag': '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />',
    'lock': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
    'unlock': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" />',
    'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />',
    'clock': '<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />',
    'external-link': '<g fill="none" fill-rule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8" /></g>',
    'grid': '<rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />',
    'loader': '<line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />',
    'alert-octagon': '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />',
    'alert-triangle': '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />',
    'help-circle': '<circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke-linecap="round" stroke-linejoin="round" /><circle cx="12" cy="17" r="0.5" fill="currentColor" />',
    'hexagon': '<path d="M12 2l9 4.9V17L12 22l-9-4.9V7z" />',
    'octagon': '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />',
    'triangle': '<path d="M3 20h18L12 4z" />',
    'circle': '<circle cx="12" cy="12" r="10" />',
    'square': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />',
    'check-square': '<polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />',
    'x-circle': '<circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />',
    'edit-corner': '<path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />',
    'filter': '<line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />',
    'play': '<polygon points="5 3 19 12 5 21 5 3" />',
    'pause': '<rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />',
    'play-circle': '<circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />',
    'stop-circle': '<circle cx="12" cy="12" r="10" /><line x1="10" y1="15" x2="10" y2="9" /><line x1="14" y1="15" x2="14" y2="9" />',
    'stop-square': '<circle cx="12" cy="12" r="10" /><rect x="9" y="9" width="6" height="6" />',
    'skip-back': '<polygon points="11 19 2 12 11 5 11 19" /><polygon points="22 19 13 12 22 5 22 19" />',
    'skip-forward': '<polygon points="13 19 22 12 13 5 13 19" /><polygon points="2 19 11 12 2 5 2 19" />',
    'step-back': '<polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" />',
    'step-forward': '<polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" />',
    'volume-up': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />',
    'volume-off': '<path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" />',
    'music': '<circle cx="5.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="15.5" r="2.5" /><path d="M8 17V5l12-2v12" />',
    'video-off': '<path d="M2 2l19.8 19.8M15 15.7V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h.3m5.4 0H13a2 2 0 0 1 2 2v3.3l1 1L22 7v10" />',
    'video-play': '<path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z" />',
    'palette': '<path d="M156.7 122.8L235.1 201.2C253.3 176.2 264 145.3 264 112C264 97.9 262.1 84.3 258.5 71.4C220.5 80.8 185.9 98.6 156.7 122.8zM122.8 156.7C98.6 185.9 80.8 220.5 71.4 258.5C84.3 262.1 97.9 264 112 264C145.3 264 176.1 253.3 201.2 235.1L122.8 156.7zM320 64C315.4 64 310.8 64.1 306.3 64.4C310 79.7 312 95.6 312 112C312 158.6 296.1 201.4 269.4 235.4L320 286.1L483.3 122.8C438.9 86.1 382.1 64 320 64zM112 312C95.6 312 79.6 310 64.4 306.3C64.2 310.8 64 315.4 64 320C64 382.1 86.1 438.9 122.8 483.3L286.1 320L235.4 269.4C201.4 296.1 158.6 312 112 312zM575.6 333.7C575.8 329.2 576 324.6 576 320C576 257.9 553.9 201.1 517.2 156.7L353.9 320L404.6 370.6C438.6 343.9 481.5 328 528 328C544.4 328 560.4 330 575.6 333.7zM568.5 381.5C555.6 377.9 542 376 527.9 376C494.6 376 463.8 386.7 438.7 404.9L517.1 483.3C541.3 454.1 559.1 419.5 568.5 381.5zM404.9 438.8C386.7 463.8 376 494.7 376 528C376 542.1 377.9 555.7 381.5 568.6C419.5 559.2 454.1 541.4 483.3 517.2L404.9 438.8zM370.6 404.5L320 353.9L156.7 517.2C201 553.9 257.9 576 320 576C324.6 576 329.2 575.9 333.7 575.6C330 560.3 328 544.4 328 528C328 481.4 343.9 438.6 370.6 404.6z" />',
    'database': '<path d="M320 320C178.6 320 64 277 64 224C64 171 178.6 128 320 128C461.4 128 576 171 576 224C576 277 461.4 320 320 320zM64 416L64 306.7C80.9 319 101 328.9 122.1 336.8C175.1 356.7 245.1 368 320 368C394.9 368 464.9 356.7 517.9 336.8C539.1 328.9 559.1 319 576 306.7L576 416C576 469 461.4 512 320 512C178.6 512 64 469 64 416z" />',
    'dice': '<path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM304 144C321.7 144 336 158.3 336 176C336 193.7 321.7 208 304 208C286.3 208 272 193.7 272 176C272 158.3 286.3 144 304 144zM272 272C272 254.3 286.3 240 304 240C321.7 240 336 254.3 336 272C336 289.7 321.7 304 304 304C286.3 304 272 289.7 272 272zM208 208C225.7 208 240 222.3 240 240C240 257.7 225.7 272 208 272C190.3 272 176 257.7 176 240C176 222.3 190.3 208 208 208z" />',
    'volleyball': '<path d="M576 322.9C552.6 330.9 528.2 336 503.4 338C509.3 239.4 472.7 146.9 408.5 79.7C506.3 115.7 576 209.7 576 320C576 321 576 321.9 576 322.9zM570.1 374.9C564.9 398.6 556.5 421.1 545.2 441.8C450.5 494 331.2 491.8 236.8 428.2C258.5 396.9 286.6 369.3 320.6 347.7C400.1 389.3 489.1 396.8 570.1 374.8zM343.7 305.6C340 215.9 302 135.1 242.4 75.9C264.7 68.8 288.4 64.7 312.9 64C405.4 119.9 463.2 224.3 455.3 337.8C417.3 334.6 379.4 324.1 343.7 305.5zM194.5 96.8C213.1 113.1 229.8 131.7 243.9 152.2C155.5 196.3 93.7 274.3 67.7 363.5C65.3 349.3 64 334.8 64 320C64 224.2 116.6 140.7 194.5 96.8zM267.9 193.8C284.2 228.3 294 266.4 295.8 306.6C220 354.6 169 427.9 147.5 509.1C129.9 493 114.5 474.5 102 454.1C104.1 346 165.7 243.7 267.9 193.8zM320 576C272.3 576 227.7 563 189.5 540.3C194.3 516 202.1 492.3 212.7 469.9C295.1 524.3 393.5 538.8 483.7 516.9C439.3 553.9 382.2 576.1 320 576.1z" />',
    'code': '<path d="M331.7 107.3C336 100.3 343.7 96 352 96L456 96C469.3 96 480 106.7 480 120C480 133.3 469.3 144 456 144L390.4 144L462.6 292.4C473.3 289.5 484.5 288 496 288C566.7 288 624 345.3 624 416C624 486.7 566.7 544 496 544C425.3 544 368 486.7 368 416C368 374 388.2 336.8 419.4 313.4L399 271.5L325.5 418.5C323.2 423.3 319.2 427.3 314.1 429.7C313.5 430 312.9 430.2 312.3 430.4C309.4 431.5 306.4 432 303.4 431.9L271 432C263.1 495.1 209.3 544 144 544C73.3 544 16 486.7 16 416C16 345.3 73.3 288 144 288C154.8 288 165.2 289.3 175.2 291.8L203.7 234.9L192.2 208L152 208C138.7 208 128 197.3 128 184C128 170.7 138.7 160 152 160L208 160C217.6 160 226.3 165.7 230.1 174.5L244.4 208L368.1 208L330.4 130.5C326.8 123.1 327.2 114.3 331.6 107.3zM228.5 292.7L182.9 384L267.7 384L228.6 292.7zM305.7 351L353.2 256L265 256L305.7 351zM474.4 426.5L444.7 365.5C431.9 378.5 424 396.3 424 416C424 455.8 456.2 488 496 488C535.8 488 568 455.8 568 416C568 376.2 535.8 344 496 344C493.3 344 490.5 344.2 487.9 344.5L517.6 405.5C523.4 417.4 518.4 431.8 506.5 437.6C494.6 443.4 480.2 438.4 474.4 426.5zM149.2 432C129 432 115.8 410.7 124.9 392.6L149.1 344.1C147.4 344 145.7 343.9 144 343.9C104.2 343.9 72 376.1 72 415.9C72 455.7 104.2 487.9 144 487.9C178.3 487.9 206.9 464 214.2 431.9L149.2 431.9z" />',
    'link': '<path d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z" />',
    'paint': '<path d="M161 191L228.4 123.6C266.6 85.4 318.4 64 372.4 64C484.9 64 576.1 155.2 576.1 267.6C576.1 314 560.3 358.7 531.6 394.6C508 377.8 479.2 367.9 448.1 367.9C417 367.9 388.2 377.8 364.7 394.5L161 191zM304 512C304 521.7 305 531.1 306.8 540.2C287 535 268.8 524.7 254.1 510C241.9 497.8 222.2 497.8 210 510L160.6 559.4C150 570 135.6 576 120.6 576C89.4 576 64 550.7 64 519.4C64 504.4 70 490 80.6 479.4L130 430C142.2 417.8 142.2 398.1 130 385.9C108.3 364.2 96.1 334.7 96.1 304C96.1 274.6 107.2 246.4 127.2 225L330.6 428.6C313.9 452.1 304 480.9 304 512zM448 416C501 416 544 459 544 512C544 565 501 608 448 608C395 608 352 565 352 512C352 459 395 416 448 416z" />',
  };

  const content = iconMap[iconId] || '';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  ${content}
</svg>`;
};

const IconsShowcase = () => {
  const { theme } = useTheme();
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);
  const [copied, setCopied] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [iconStates, setIconStates] = useState<Record<string, boolean>>({
    heart: false,
    star: false,
    bell: false,
    menu: false,
    settings: false,
    lock: false,
    unlock: false,
    eye: false,
    'chevron-up': false,
    'chevron-down': false,
    'chevron-left': false,
    'chevron-right': false,
    'thumbs-up': false,
    'thumbs-down': false,
    'video-play': false,
  });

  useEffect(() => {
    if (selectedIcon) {
      document.body.style.overflow = 'hidden';
      const scrollToTop = () => {
        if (modalContentRef.current) {
          modalContentRef.current.scrollTop = 0;
          modalContentRef.current.scrollTo({ top: 0, behavior: 'instant' });
        }
      };
      
      scrollToTop();
      setTimeout(scrollToTop, 50);
      setTimeout(scrollToTop, 200);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIcon]);

  const handleCopyCode = async (icon: Icon) => {
    const code = getIconSVGCode(icon.id);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleIconClick = (icon: Icon, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!icon.interactive) {
      setSelectedIcon(icon);
      return;
    }

    switch (icon.id) {
      case 'heart':
      case 'star':
        setIconStates(prev => ({
          ...prev,
          [icon.id]: !prev[icon.id]
        }));
        setSelectedIcon(icon);
        break;
      case 'bell':
        setIconStates(prev => ({
          ...prev,
          bell: true
        }));
        setTimeout(() => {
          setIconStates(prev => ({
            ...prev,
            bell: false
          }));
        }, 500);
        setSelectedIcon(icon);
        break;
      case 'menu':
        setIconStates(prev => ({
          ...prev,
          menu: !prev.menu
        }));
        setSelectedIcon(icon);
        break;
      case 'settings':
        setIconStates(prev => ({
          ...prev,
          settings: true
        }));
        setTimeout(() => {
          setIconStates(prev => ({
            ...prev,
            settings: false
          }));
        }, 3000);
        setSelectedIcon(icon);
        break;
      case 'lock':
        setIconStates(prev => ({
          ...prev,
          lock: !prev.lock
        }));
        setSelectedIcon(icon);
        break;
      case 'unlock':
        setIconStates(prev => ({
          ...prev,
          unlock: !prev.unlock
        }));
        setSelectedIcon(icon);
        break;
      case 'eye':
        setIconStates(prev => ({
          ...prev,
          eye: !prev.eye
        }));
        setSelectedIcon(icon);
        break;
      case 'chevron-up':
      case 'chevron-down':
      case 'chevron-left':
      case 'chevron-right':
        setIconStates(prev => ({
          ...prev,
          [icon.id]: !prev[icon.id]
        }));
        setSelectedIcon(icon);
        break;
      case 'thumbs-up':
      case 'thumbs-down':
        setIconStates(prev => ({
          ...prev,
          [icon.id]: !prev[icon.id],
          [`${icon.id}-animate`]: true
        }));
        setTimeout(() => {
          setIconStates(prev => ({
            ...prev,
            [`${icon.id}-animate`]: false
          }));
        }, 600);
        setSelectedIcon(icon);
        break;
      case 'video-play':
        setIconStates(prev => ({
          ...prev,
          'video-play': !prev['video-play']
        }));
        setSelectedIcon(icon);
        break;
      default:
        setSelectedIcon(icon);
    }
  };

  const renderIcon = (icon: Icon) => {
    const isInteractive = icon.interactive || false;
    const iconState = iconStates[icon.id] || false;

    switch (icon.id) {
      case 'cart':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="20.5" r="1" />
            <circle cx="18" cy="20.5" r="1" />
            <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
          </svg>
        );
      case 'account':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case 'shop':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'page':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        );
      case 'file':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        );
      case 'folder':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'trash':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        );
      case 'ladder':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
            <path d="M6 3v18M18 3v18" />
          </svg>
        );
      case 'basketball':
        return (
          <svg viewBox="0 0 16 16" className="icons-showcase__svg" fill="currentColor">
            <path fillRule="evenodd" d="M7.133 2.067c-1.066.133-2.066.6-2.933 1.266L6.067 5.2c.666-.867 1-1.933 1.066-3.133ZM8 7.2l3.8-3.867C10.8 2.467 9.533 2.067 8.267 2c0 1.533-.534 2.933-1.4 4.067L8 7.2Zm-4.667-3C2.6 5.067 2.2 6.067 2 7.133c1.2-.066 2.333-.4 3.2-1.066L3.333 4.2Zm6.6 4.933c1.067-.866 2.534-1.4 4.067-1.4-.067-1.266-.533-2.466-1.333-3.533L8.8 8l1.133 1.133ZM8 8.8l-3.8 3.867c1 .866 2.267 1.266 3.533 1.333 0-1.533.534-2.933 1.4-4.067L8 8.8Zm4.667 3C13.4 10.933 13.8 9.933 14 8.867c-1.2.066-2.333.4-3.2 1.066l1.867 1.867Zm-6.6-4.933C5 7.733 3.533 8.267 2 8.267c.067 1.266.533 2.466 1.333 3.533l3.8-3.8-1.066-1.133Zm2.8 7.066c1.066-.133 2.066-.6 2.933-1.333l-1.867-1.867c-.666.934-1 2-1.066 3.2Z" />
          </svg>
        );
      case 'hockey-puck':
        return (
          <svg viewBox="0 0 16 16" className="icons-showcase__svg" fill="currentColor">
            <path fillRule="evenodd" d="M2 5.6c0-1.267 2.667-2.267 6-2.267s6 1 6 2.267-2.667 2.267-6 2.267C4.667 7.8 2 6.8 2 5.6Zm0 1.933v2.6C2 11.4 4.667 12.4 8 12.4s6-1 6-2.267v-2.6c-2.667 1.934-9.333 1.934-12 0Z" />
          </svg>
        );
      case 'football':
        return (
          <svg viewBox="0 0 16 16" className="icons-showcase__svg" fill="currentColor">
            <path fillRule="evenodd" d="M13.667 3.267a1.32 1.32 0 0 0-.934-.934A10.582 10.582 0 0 0 10.2 2L14 5.8c0-1.067-.2-1.933-.333-2.533ZM2.333 12.733c.134.467.467.8.934.934C3.8 13.8 4.733 14 5.8 14L2 10.2c0 1.067.2 1.933.333 2.533Zm-.2-4.066 5.2 5.266c3.2-.466 6-2.866 6.6-6.533L8.667 2.067c-3.2.466-6 2.933-6.534 6.6Zm7.667-3a.203.203 0 0 1 .267 0l.266.266c.067.067.067.2 0 .267l-.666.667.666.666c.067.067.067.2 0 .267l-.266.267a.203.203 0 0 1-.267 0L9.133 7.4l-.6.6.667.667c.067.066.067.2 0 .266l-.267.267a.203.203 0 0 1-.266 0L8 8.533l-.533.534.666.666c.067.067.067.2 0 .267l-.266.267a.203.203 0 0 1-.267 0L6.933 9.6l-.666.667a.203.203 0 0 1-.267 0L5.733 10a.203.203 0 0 1 0-.267l.667-.666-.667-.667a.203.203 0 0 1 0-.267L6 7.867a.203.203 0 0 1 .267 0l.666.666L7.467 8 6.8 7.333a.203.203 0 0 1 0-.266l.267-.267a.203.203 0 0 1 .266 0L8 7.467l.533-.534-.666-.666a.203.203 0 0 1 0-.267l.266-.267a.203.203 0 0 1 .267 0l.667.667.733-.733Z" />
          </svg>
        );
      case 'baseball':
        return (
          <svg viewBox="0 0 16 16" className="icons-showcase__svg" fill="currentColor">
            <path fillRule="evenodd" d="m10.933 10.6.667-.333c.267.533.6 1.066 1.067 1.466C13.467 10.667 14 9.4 14 8s-.467-2.733-1.333-3.733c-.4.4-.8.866-1.067 1.466l-.667-.333c.334-.6.734-1.2 1.2-1.667A5.85 5.85 0 0 0 8 2c-1.6 0-3.067.667-4.133 1.667.466.466.866 1.066 1.2 1.666l-.667.334c-.267-.534-.667-1-1.067-1.4C2.467 5.267 2 6.6 2 8s.467 2.733 1.333 3.733c.467-.4.8-.933 1.067-1.466l.667.333A6.441 6.441 0 0 1 3.8 12.333C4.933 13.333 6.4 14 8 14s3.067-.667 4.133-1.667c-.466-.533-.933-1.066-1.2-1.733ZM5.4 9.867 4.667 9.6C5 8.467 5 7.333 4.667 6.333l.733-.266a6.691 6.691 0 0 1 0 3.8Zm5.2-3.734.733.2c-.333 1-.4 2.134 0 3.267l-.733.267a6.456 6.456 0 0 1 0-3.734Z" />
          </svg>
        );
      case 'videogames':
        return (
          <svg viewBox="0 0 16 16" className="icons-showcase__svg" fill="currentColor">
            <path fillRule="evenodd" d="M11.617 7.533c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4Zm-.8-.8c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4Zm0 1.667c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4Zm-.8-.867c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4ZM4.817 8c-.4 0-.8-.4-.8-.8 0-.467.4-.8.8-.8.466 0 .8.4.8.8.066.4-.334.8-.8.8Zm8.666-.333C13.083 6.533 12.55 5.6 12.017 5c-.534-.6-1.334-.867-2.067-.6-.067 0-.133.067-.2.067-.467.266-1.067.4-1.733.4-.6 0-1.2-.134-1.734-.334-.066-.066-.133-.066-.2-.066-.666-.267-1.4-.067-1.933.466-.533.534-1.2 1.534-1.6 2.734-.733 2-.733 3.866 0 4.133.6.2 1.467-.667 2.2-2.067.067-.133.2-.266.333-.266h5.8c.134 0 .334.133.334.266.666 1.4 1.6 2.267 2.2 2.067.8-.267.8-2.067.066-4.133Z" />
          </svg>
        );
      case 'container':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill={iconState ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'fill 0.4s ease' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill={iconState ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'fill 0.4s ease' }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      case 'home':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
            <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
          </svg>
        );
      case 'search':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        );
      case 'menu':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''} ${iconState ? 'icons-showcase__svg--close' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" className={`icons-showcase__menu-line icons-showcase__menu-line--middle ${iconState ? 'icons-showcase__menu-line--hidden' : ''}`} />
            <line x1="3" y1="6" x2="21" y2="6" className={`icons-showcase__menu-line icons-showcase__menu-line--top ${iconState ? 'icons-showcase__menu-line--top-rotated' : ''}`} />
            <line x1="3" y1="18" x2="21" y2="18" className={`icons-showcase__menu-line icons-showcase__menu-line--bottom ${iconState ? 'icons-showcase__menu-line--bottom-rotated' : ''}`} />
          </svg>
        );
      case 'settings':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive icons-showcase__svg--settings' : ''} ${iconState ? 'icons-showcase__svg--rotating' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 'bell':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''} ${iconState ? 'icons-showcase__svg--shake' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
          </svg>
        );
      case 'message':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );
      case 'email':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        );
      case 'camera':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <g transform="translate(2 3)">
              <path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z" />
              <circle cx="10" cy="10" r="4" />
            </g>
          </svg>
        );
      case 'image':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        );
      case 'download':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        );
      case 'upload':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        );
      case 'data':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        );
      case 'edit':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="16 3 21 8 8 21 3 21 3 16 16 3" />
          </svg>
        );
      case 'save':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        );
      case 'check':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'close':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        );
      case 'plus':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
      case 'minus':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
      case 'bookmark':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'tag':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        );
      case 'lock':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <g className="icons-showcase__morph-group">
              <path className="icons-showcase__morph-path" d="M7 11V7a5 5 0 0 1 10 0v4" style={{ opacity: iconState ? 0 : 1 }} />
              <path className="icons-showcase__morph-path" d="M7 11V7a5 5 0 0 1 9.9-1" style={{ opacity: iconState ? 1 : 0 }} />
            </g>
          </svg>
        );
      case 'unlock':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <g className="icons-showcase__morph-group">
              <path className="icons-showcase__morph-path" d="M7 11V7a5 5 0 0 1 9.9-1" style={{ opacity: iconState ? 0 : 1 }} />
              <path className="icons-showcase__morph-path" d="M7 11V7a5 5 0 0 1 10 0v4" style={{ opacity: iconState ? 1 : 0 }} />
            </g>
          </svg>
        );
      case 'eye':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {iconState ? (
              <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </>
            ) : (
              <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </>
            )}
          </svg>
        );
      case 'calendar':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case 'clock':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'location':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'arrow-up':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V6M5 12l7-7 7 7" />
          </svg>
        );
      case 'arrow-down':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v13M5 12l7 7 7-7" />
          </svg>
        );
      case 'arrow-left':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        );
      case 'arrow-right':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h13M12 5l7 7-7 7" />
          </svg>
        );
      case 'arrow-down-left':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 17L7.8 7.7M7 17V7h10" />
          </svg>
        );
      case 'arrow-up-left':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        );
      case 'arrow-down-right':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 7l-9.2 9.2M7 7v10h10" />
          </svg>
        );
      case 'arrow-up-right':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7l9.2 9.2M17 7v10H7" />
          </svg>
        );
      case 'arrow-corner-down-left':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 16l-6-6 6-6" />
            <path d="M20 21v-7a4 4 0 0 0-4-4H5" />
          </svg>
        );
      case 'arrow-corner-down-right':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 16l6-6-6-6" />
            <path d="M4 21v-7a4 4 0 0 1 4-4h11" />
          </svg>
        );
      case 'arrow-corner-up-left':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 9l-6 6 6 6" />
            <path d="M20 4v7a4 4 0 0 1-4 4H5" />
          </svg>
        );
      case 'arrow-corner-up-right':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9l6 6-6 6" />
            <path d="M4 4v7a4 4 0 0 0 4 4h11" />
          </svg>
        );
      case 'arrow-corner-left-up':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 14l-6 6-6-6" />
            <path d="M20 4h-7a4 4 0 0 0-4 4v11" />
          </svg>
        );
      case 'arrow-corner-left-down':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 10L9 4l-6 6" />
            <path d="M20 20h-7a4 4 0 0 1-4-4V5" />
          </svg>
        );
      case 'arrow-corner-right-up':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 14l6 6 6-6" />
            <path d="M4 4h7a4 4 0 0 1 4 4v11" />
          </svg>
        );
      case 'arrow-corner-right-down':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 10l6-6 6 6" />
            <path d="M4 20h7a4 4 0 0 0 4-4V5" />
          </svg>
        );
      case 'chevron-up':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ 
            transform: iconState ? 'rotate(180deg)' : 'rotate(0deg)',
            transformOrigin: 'center',
            transition: 'transform 0.4s ease'
          }}>
            <path d="M18 15l-6-6-6 6" />
          </svg>
        );
      case 'chevron-down':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ 
            transform: iconState ? 'rotate(180deg)' : 'rotate(0deg)',
            transformOrigin: 'center',
            transition: 'transform 0.4s ease'
          }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        );
      case 'chevron-left':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ 
            transform: iconState ? 'rotate(180deg)' : 'rotate(0deg)',
            transformOrigin: 'center',
            transition: 'transform 0.4s ease'
          }}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        );
      case 'chevron-right':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ 
            transform: iconState ? 'rotate(180deg)' : 'rotate(0deg)',
            transformOrigin: 'center',
            transition: 'transform 0.4s ease'
          }}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        );
      case 'refresh-ccw':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 2v6h6M21.5 22v-6h-6" />
            <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" />
          </svg>
        );
      case 'refresh-cw':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
        );
      case 'refresh-cw-alt':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
          </svg>
        );
      case 'arrow-left-right':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 2.1l4 4-4 4" />
            <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
            <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
          </svg>
        );
      case 'arrow-right-page':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
          </svg>
        );
      case 'arrow-left-page':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
          </svg>
        );
      case 'download-alt':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
          </svg>
        );
      case 'upload-alt':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
          </svg>
        );
      case 'cloud-download':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
            <path d="M16 16l-4-4-4 4" />
          </svg>
        );
      case 'cloud-upload':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8M12 19.8V12M16 17l-4 4-4-4" />
          </svg>
        );
      case 'maximize':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        );
      case 'minimize':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
          </svg>
        );
      case 'trending-down':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.2 17.2l-7.7-7.7-4 4-5.7-5.7" />
            <path d="M15 18h6v-6" />
          </svg>
        );
      case 'trending-up':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
            <path d="M15 7h6v6" />
          </svg>
        );
      case 'move':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.2 9l-3 3 3 3M9 5.2l3-3 3 3M15 18.9l-3 3-3-3M18.9 9l3 3-3 3M3.3 12h17.4M12 3.2v17.6" />
          </svg>
        );
      case 'external-link':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <g fill="none" fill-rule="evenodd">
              <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8" />
            </g>
          </svg>
        );
      case 'grid':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        );
      case 'loader':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </svg>
        );
      case 'alert-octagon':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      case 'alert-triangle':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
        case 'help-circle':
          return (
            <svg
              viewBox="0 0 24 24"
              className="icons-showcase__svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
              <circle cx="12" cy="18" r="0.7" fill="currentColor" stroke="none" />
            </svg>
          );        
      case 'hexagon':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z" />
          </svg>
        );
      case 'octagon':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
          </svg>
        );
      case 'triangle':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20h18L12 4z" />
          </svg>
        );
      case 'circle':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      case 'square':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        );
      case 'check-circle':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case 'check-square':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        );
      case 'x-circle':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        );
      case 'edit-corner':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
          </svg>
        );
      case 'filter':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        );
      case 'flag':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
        );
      case 'message-circle':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );
      case 'moon':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        );
      case 'thumbs-up':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''} ${iconStates[`${icon.id}-animate`] ? 'icons-showcase__svg--thumbs-up-animate' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
        );
      case 'thumbs-down':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''} ${iconStates[`${icon.id}-animate`] ? 'icons-showcase__svg--thumbs-down-animate' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
          </svg>
        );
      case 'shopping-bag':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0" />
          </svg>
        );
      case 'compass':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z" />
          </svg>
        );
      case 'card':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M7 15h0M2 9.5h20" />
          </svg>
        );
      case 'play':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        );
      case 'pause':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        );
      case 'play-circle':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
        );
      case 'stop-circle':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="10" y1="15" x2="10" y2="9" />
            <line x1="14" y1="15" x2="14" y2="9" />
          </svg>
        );
      case 'stop-square':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <rect x="9" y="9" width="6" height="6" />
          </svg>
        );
      case 'skip-back':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 19 2 12 11 5 11 19" />
            <polygon points="22 19 13 12 22 5 22 19" />
          </svg>
        );
      case 'skip-forward':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 19 22 12 13 5 13 19" />
            <polygon points="2 19 11 12 2 5 2 19" />
          </svg>
        );
      case 'step-back':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" y1="19" x2="5" y2="5" />
          </svg>
        );
      case 'step-forward':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
        );
      case 'volume-up':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        );
      case 'volume-off':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" />
          </svg>
        );
      case 'music':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="15.5" r="2.5" />
            <path d="M8 17V5l12-2v12" />
          </svg>
        );
      case 'video-off':
        return (
          <svg viewBox="0 0 24 24" className="icons-showcase__svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 2l19.8 19.8M15 15.7V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h.3m5.4 0H13a2 2 0 0 1 2 2v3.3l1 1L22 7v10" />
          </svg>
        );
      case 'video-play':
        return (
          <svg viewBox="0 0 24 24" className={`icons-showcase__svg ${isInteractive ? 'icons-showcase__svg--interactive' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z" />
            <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1z" />
            {iconState && (
              <line 
                x1="2" 
                y1="2" 
                x2="22" 
                y2="22" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                style={{ 
                  opacity: 1,
                  transition: 'opacity 0.4s ease'
                }}
              />
            )}
          </svg>
        );
      case 'dice':
        return (
          <svg viewBox="0 0 640 640" className="icons-showcase__svg" fill="currentColor" stroke="none" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
            <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM304 144C321.7 144 336 158.3 336 176C336 193.7 321.7 208 304 208C286.3 208 272 193.7 272 176C272 158.3 286.3 144 304 144zM272 272C272 254.3 286.3 240 304 240C321.7 240 336 254.3 336 272C336 289.7 321.7 304 304 304C286.3 304 272 289.7 272 272zM208 208C225.7 208 240 222.3 240 240C240 257.7 225.7 272 208 272C190.3 272 176 257.7 176 240C176 222.3 190.3 208 208 208z" />
          </svg>
        );
      case 'volleyball':
        return (
          <svg viewBox="0 0 640 640" className="icons-showcase__svg" fill="currentColor" stroke="none" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
            <path d="M576 322.9C552.6 330.9 528.2 336 503.4 338C509.3 239.4 472.7 146.9 408.5 79.7C506.3 115.7 576 209.7 576 320C576 321 576 321.9 576 322.9zM570.1 374.9C564.9 398.6 556.5 421.1 545.2 441.8C450.5 494 331.2 491.8 236.8 428.2C258.5 396.9 286.6 369.3 320.6 347.7C400.1 389.3 489.1 396.8 570.1 374.8zM343.7 305.6C340 215.9 302 135.1 242.4 75.9C264.7 68.8 288.4 64.7 312.9 64C405.4 119.9 463.2 224.3 455.3 337.8C417.3 334.6 379.4 324.1 343.7 305.5zM194.5 96.8C213.1 113.1 229.8 131.7 243.9 152.2C155.5 196.3 93.7 274.3 67.7 363.5C65.3 349.3 64 334.8 64 320C64 224.2 116.6 140.7 194.5 96.8zM267.9 193.8C284.2 228.3 294 266.4 295.8 306.6C220 354.6 169 427.9 147.5 509.1C129.9 493 114.5 474.5 102 454.1C104.1 346 165.7 243.7 267.9 193.8zM320 576C272.3 576 227.7 563 189.5 540.3C194.3 516 202.1 492.3 212.7 469.9C295.1 524.3 393.5 538.8 483.7 516.9C439.3 553.9 382.2 576.1 320 576.1z" />
          </svg>
        );
      case 'code':
        return (
          <svg viewBox="0 0 640 640" className="icons-showcase__svg" fill="currentColor" stroke="none" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
            <path d="M331.7 107.3C336 100.3 343.7 96 352 96L456 96C469.3 96 480 106.7 480 120C480 133.3 469.3 144 456 144L390.4 144L462.6 292.4C473.3 289.5 484.5 288 496 288C566.7 288 624 345.3 624 416C624 486.7 566.7 544 496 544C425.3 544 368 486.7 368 416C368 374 388.2 336.8 419.4 313.4L399 271.5L325.5 418.5C323.2 423.3 319.2 427.3 314.1 429.7C313.5 430 312.9 430.2 312.3 430.4C309.4 431.5 306.4 432 303.4 431.9L271 432C263.1 495.1 209.3 544 144 544C73.3 544 16 486.7 16 416C16 345.3 73.3 288 144 288C154.8 288 165.2 289.3 175.2 291.8L203.7 234.9L192.2 208L152 208C138.7 208 128 197.3 128 184C128 170.7 138.7 160 152 160L208 160C217.6 160 226.3 165.7 230.1 174.5L244.4 208L368.1 208L330.4 130.5C326.8 123.1 327.2 114.3 331.6 107.3zM228.5 292.7L182.9 384L267.7 384L228.6 292.7zM305.7 351L353.2 256L265 256L305.7 351zM474.4 426.5L444.7 365.5C431.9 378.5 424 396.3 424 416C424 455.8 456.2 488 496 488C535.8 488 568 455.8 568 416C568 376.2 535.8 344 496 344C493.3 344 490.5 344.2 487.9 344.5L517.6 405.5C523.4 417.4 518.4 431.8 506.5 437.6C494.6 443.4 480.2 438.4 474.4 426.5zM149.2 432C129 432 115.8 410.7 124.9 392.6L149.1 344.1C147.4 344 145.7 343.9 144 343.9C104.2 343.9 72 376.1 72 415.9C72 455.7 104.2 487.9 144 487.9C178.3 487.9 206.9 464 214.2 431.9L149.2 431.9z" />
          </svg>
        );
      case 'link':
        return (
          <svg viewBox="0 0 640 640" className="icons-showcase__svg" fill="currentColor" stroke="none" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
            <path d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z" />
          </svg>
        );
      case 'paint':
        return (
          <svg viewBox="0 0 640 640" className="icons-showcase__svg" fill="currentColor" stroke="none" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
            <path d="M161 191L228.4 123.6C266.6 85.4 318.4 64 372.4 64C484.9 64 576.1 155.2 576.1 267.6C576.1 314 560.3 358.7 531.6 394.6C508 377.8 479.2 367.9 448.1 367.9C417 367.9 388.2 377.8 364.7 394.5L161 191zM304 512C304 521.7 305 531.1 306.8 540.2C287 535 268.8 524.7 254.1 510C241.9 497.8 222.2 497.8 210 510L160.6 559.4C150 570 135.6 576 120.6 576C89.4 576 64 550.7 64 519.4C64 504.4 70 490 80.6 479.4L130 430C142.2 417.8 142.2 398.1 130 385.9C108.3 364.2 96.1 334.7 96.1 304C96.1 274.6 107.2 246.4 127.2 225L330.6 428.6C313.9 452.1 304 480.9 304 512zM448 416C501 416 544 459 544 512C544 565 501 608 448 608C395 608 352 565 352 512C352 459 395 416 448 416z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`icons-showcase icons-showcase--${theme}`}>
      <div className="icons-showcase__container">
        <header className="icons-showcase__header">
          <h2 className="icons-showcase__title">SVG Icons Showcase</h2>
          <p className="icons-showcase__subtitle">
            A collection of clean, practical icons for modern applications. Click any icon to copy its code.
          </p>
        </header>

        <div className="icons-showcase__grid">
          {icons.map(icon => (
            <div
              key={icon.id}
              className="icons-showcase__item"
              onClick={(e) => handleIconClick(icon, e)}
            >
              <div className={`icons-showcase__icon-wrapper ${icon.interactive ? 'icons-showcase__icon-wrapper--interactive' : ''}`}>
                {renderIcon(icon)}
              </div>
              <div className="icons-showcase__label">{icon.name}</div>
              {icon.interactive && (
                <div className="icons-showcase__click-hint">Click Me</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedIcon && (
        <div className="icons-showcase__modal" onClick={() => setSelectedIcon(null)}>
          <div className="icons-showcase__modal-content" ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
            <div className="icons-showcase__modal-header">
              <h3 className="icons-showcase__modal-title">{selectedIcon.name} Icon</h3>
              <button
                className="icons-showcase__modal-close"
                onClick={() => setSelectedIcon(null)}
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div 
              className="icons-showcase__modal-preview"
              onClick={(e) => {
                if (selectedIcon.interactive) {
                  handleIconClick(selectedIcon, e);
                }
              }}
            >
              {renderIcon(selectedIcon)}
            </div>
            <div className="icons-showcase__modal-code">
              <div className="icons-showcase__code-header">
                <span className="icons-showcase__code-label">SVG Code</span>
                <button
                  className="icons-showcase__copy-btn"
                  onClick={() => handleCopyCode(selectedIcon)}
                  aria-label="Copy code"
                >
                  <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="icons-showcase__code-block">
                <code>{getIconSVGCode(selectedIcon.id)}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconsShowcase;
