import type React from "react";
import Sidebar from "../sidebar/Sidebar";
import clsx from "clsx";
import styles from "./ContentLayout.module.css"

interface LayoutProps {
    children: React.ReactNode
}

const ContentLayout = ({ children }: LayoutProps) => {
    return ( 
        <div className={clsx(styles.layout)}>
            <Sidebar />
            <main className={styles.content}>
                {children}
            </main> 
        </div>
    );
}

export default ContentLayout;