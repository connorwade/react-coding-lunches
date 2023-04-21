import { Story } from "../types";
import ListItem, { ListItemProps } from "./ListItem";
import styles from "./List.module.css";

export type ListProps = {
  list: Story[];
  onRemoveItem: (item: Story) => void;
};

export default function List({ list, onRemoveItem }: ListProps) {
  return (
    <>
      <ul className={styles.list}>
        {list.map((item) => {
          return (
            <ListItem
              {...item}
              key={item.objectID}
              handleRemoveItem={onRemoveItem}
            />
          );
        })}
      </ul>
    </>
  );
}
