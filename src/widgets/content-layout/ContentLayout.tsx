import type React from "react";
import Sidebar from "../sidebar/Sidebar";
import clsx from "clsx";
import styles from "./ContentLayout.module.css"
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode
}

const ContentLayout = ({ children }: LayoutProps) => {
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
                {children}
            </main> 
        </div>
    );
};

export default ContentLayout;