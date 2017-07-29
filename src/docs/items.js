import Dropdown from '../components/dropdown/demo';
import Modal from '../components/modal/demo';

const items = [
  Dropdown,
  Modal,
];

items.forEach(item => {
  // eslint-disable-next-line prefer-template
  item.meta.path = '/' + item.meta.name.replace(/[a-z][A-Z]/g, m => `${m[0]}-${m[1]}`).toLowerCase();
});

export default items;
