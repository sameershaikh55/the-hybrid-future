import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AuthWrapperProps, RootState } from "./types";
import { loadUser } from "@/store/actions/auth";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/store/reducers/auth/types";
import Loader from "@/components/Loader";

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
}: AuthWrapperProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    dispatchTyped(loadUser());
  }, []);

  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/login");
    }
  }, [isAuthenticated, router, loading]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
