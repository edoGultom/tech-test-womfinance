export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
  };
  
  export type AuthStackParamList = {
    Login: undefined;
  };
  
  export type MainStackParamList = {
    Dashboard: undefined;
    Detail: { userId: string }; 
  };
  