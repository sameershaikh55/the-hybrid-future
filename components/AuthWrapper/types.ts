export interface Redirection {
  destination: string;
  permanent: boolean;
}

export interface AuthWrapperProps {
  children?: React.ReactNode;
  redirect?: Redirection;
}

export interface RootState {
  auth: {
    isAuthenticated: boolean;
    loading: boolean;
  };
}
