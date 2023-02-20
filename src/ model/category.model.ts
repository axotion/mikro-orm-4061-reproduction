import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Category {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @ManyToOne(() => Category, {
    nullable: true,
  })
  parent: Category | null;

  //TODO eager does not work in current mikro-orm version - wait for resolve issue
  @OneToMany({
    entity: () => Category,
    mappedBy: (category) => category.parent,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    eager: true,
  })
  children = new Collection<Category>(this);
}
