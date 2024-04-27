import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MetLogo from "@/components/MetLogo";
import { CircleStackIcon, NewspaperIcon } from "@heroicons/react/16/solid";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";

interface LayoutProps {
  children: ReactNode;
}

interface Department {
  departmentId: number;
  displayName: string;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments");
      const data = await response.json();
      setDepartments(data.departments);
    };

    fetchDepartments();
  }, []);

  return (
    <div className="m-0 p-0 w-screen h-screen flex flex-col justify-center items-center">
      <div className="pl-10 w-full h-1/6 flex items-center border-4 border-transparent border-b-red-600">
        <MetLogo />
        <Menu>
          <MenuHandler>
            <Button
              variant="text"
              className="ml-11 mt-3 text-black hover:text-gray-500 border-none bg-transparent"
            >
              <span className="font-semibold">Departments</span>
            </Button>
          </MenuHandler>
          <MenuList>
            {departments.map((dept) => (
              <MenuItem key={dept.departmentId} onClick={() => router.push(`/departments/${dept.departmentId}`)}>
                {dept.displayName}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Button
          className="ml-11 mt-3 text-black hover:text-gray-500 border-none bg-transparent"
          onClick={() => router.push("/page/1")}
        >
          <NewspaperIcon className="w-7 h-7" />
          <span className="ml-2 font-semibold">Random Collection</span>
        </Button>
        
        <Button
          className="ml-3 mt-3 text-black hover:text-gray-500 border-none bg-transparent"
          onClick={() => router.push("/collection")}
        >
          <CircleStackIcon className="w-7 h-7" />
          <span className="ml-2 font-semibold">Your Collection</span>
        </Button>
      </div>

      <div className="w-full h-5/6 flex flex-col justify-start items-center">
        {children}
      </div>
    </div>
  );
}
