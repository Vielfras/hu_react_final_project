import { useMemo, PropsWithChildren, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

type UserRolesType = undefined | 'user' | 'business' | 'admin';

interface IRestrictedProps {
  allowedRoles: UserRolesType[];
}

export default function Restricted(props: PropsWithChildren<IRestrictedProps>) {
  const { allowedRoles, children } = props;
  const auth = useContext(AuthContext);

  const userRole = useMemo(() => {
    let role: UserRolesType = undefined;
    if (auth?.userDetails?.isAdmin) {
      role = 'admin';
    } else if (auth?.userDetails?.isBusiness) {
      role = 'business';
    } else if (auth?.userDetails) {
      role = 'user';
    }
    return role;
  }, [auth?.userDetails]); 

  return (
    <>
      {
        allowedRoles.includes(userRole) && children
      }
    </>
  );
}
