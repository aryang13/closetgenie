import { ListItem } from '@rneui/themed';

export default function MainItem(props) {
  return (
    <ListItem
      {...props}
      containerStyle={{
        backgroundColor: '#002665',
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 15,
        padding: 15,
      }}
    ></ListItem>
  );
}
