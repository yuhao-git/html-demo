export default interface menuItem {
  path: String;
  label: String;
  icon?: String;
  key?: String;
  children?: Array<menuItem>;
}
