import { DrawerScreenProps } from '@react-navigation/drawer';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Routes } from './routeConstants';

export type RootStackParamList = {
  [Routes.BottomTab]: NavigatorScreenParams<
    BottomTabsParamList,
    [Routes.NotesHom]
  >;

  [Routes.NotesNavigator]: NavigatorScreenParams<
    DrawerParamList,
    [Routes.NotesHome]
  >;
  [Routes.Home]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type BottomTabsParamList = {
  [Routes.NotesHome]: undefined;
  [Routes.Gallery]: undefined;
  [Routes.Camera]: undefined;
  [Routes.Budget]: undefined;

  [Routes.Settings]: undefined;
};

export type DrawerParamList = {
  [Routes.NotesHome]: undefined;
  [Routes.Note]: undefined;
};
export type NoteDrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
