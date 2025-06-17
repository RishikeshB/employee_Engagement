import { TabRouteName } from '@/interface/tabs';
import { Feather } from '@expo/vector-icons';
import { JSX } from 'react';

export const icon: Record<TabRouteName, (props: any) => JSX.Element> = {
  home: (props) => <Feather name='home' size={20} {...props} />,
  profile: (props) => <Feather name='user' size={20} {...props} />,
};
