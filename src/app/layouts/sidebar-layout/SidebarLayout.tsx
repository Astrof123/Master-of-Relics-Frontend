import clsx from "clsx";
import styles from "./SidebarLayout.module.css"
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/widgets/sidebar/Sidebar";


export const SidebarLayout = () => {
    const contentRef = useRef<HTMLElement>(null);
    const { pathname } = useLocation();
    
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [pathname]);
    
    return ( 
        <div className={clsx(styles.layout)}>
            <Sidebar />
            <main 
                ref={contentRef}
                className={styles.content}
            >
                <Outlet />
            </main> 
        </div>
    );
};