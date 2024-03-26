import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Routes } from './routeConstants';

export type BudgetingStackParamList = {
  [Routes.BudgetingHome]: undefined;
  [Routes.BudgetingCategorySpend]: { categoryId: number };
};

export type RootStackParamList = {
  [Routes.BottomTab]: NavigatorScreenParams<
    BottomTabsParamList,
    [Routes.NotesHome]
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
  [Routes.NotesHome]: NavigatorScreenParams<
    NoteDrawerScreenProps,
    [Routes.NotesHome]
  >;
  [Routes.Gallery]: undefined;
  [Routes.Camera]: undefined;
  [Routes.Budget]: NavigatorScreenParams<
    BudgetingStackParamList,
    [Routes.BudgetingHome]
  >;

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
export type AppBottomBarScreenProps<T extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
