"use client"

export const runtime = 'edge';

import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
//import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from "react-redux";
import { selectHeaderMenu } from ".././store/slice/dataSlice";
interface NavigationMenuMainProps {
	device: string;
}

interface childrens {
	title: string;
	link: string;
}

interface headerMenus {
	title: string;
	link: string;
	children: childrens[] | null;
}


const NavigationMenuMain: React.FC<NavigationMenuMainProps> = ({ device }) => {
	const pathname = usePathname();
	const HeaderMenu = useSelector(selectHeaderMenu);

	return (<>
		<NavigationMenu.Root className="NavigationMenuRoot">
			<NavigationMenu.List className={`NavigationMenuList ${device}`}>

				{HeaderMenu && HeaderMenu.map((item: headerMenus, index: number) => (
					<NavigationMenu.Item key={index}>
						{item.children && item.children?.length === 0 ? (<>
							<NavigationMenu.Link
								className={`NavigationMenuLink ${pathname === item.link ? "active" : ""}`}
								href={`${item.link}` || '#'}
							>{item.title}</NavigationMenu.Link>
						</>) : (<>


							<NavigationMenu.Trigger className={`NavigationMenuTrigger ${item.children?.some((subitemclass) => pathname === subitemclass.link)
								? "active"
								: ""
								}`}>
								<Link style={{ marginTop: '-3px' }}
									href={`${item.link}` || '#'}
								>{item.title}</Link> <CaretDownIcon className="CaretDown" aria-hidden />
							</NavigationMenu.Trigger>
							<NavigationMenu.Content className="NavigationMenuContent">
								<ul className="List one">
									{item.children && item.children.map((subitem: childrens, index: number) => (
										<ListItem key={index} href={`${subitem.link}` || '#'} title={subitem.title || "?"}></ListItem>
									))}



								</ul>
							</NavigationMenu.Content>

						</>)}


					</NavigationMenu.Item>
				))}






				<NavigationMenu.Indicator className="NavigationMenuIndicator">
					<div className="Arrow" />
				</NavigationMenu.Indicator>
			</NavigationMenu.List>

			<div className="ViewportPosition">
				<NavigationMenu.Viewport className="NavigationMenuViewport " />
			</div>
		</NavigationMenu.Root>

	</>
	);
};

interface ListItemProps {
	href: string;
	title: string;
	children?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
	({ children, title, href, ...props }, forwardedRef) => (
		<li>
			<NavigationMenu.Link asChild>
				<Link
					className={cn("ListItemLink")}
					href={href}
					{...props}
					ref={forwardedRef}
				>
					<div className="ListItemHeading">{title}</div>
					<p className="ListItemText">{children}</p>
				</Link>
			</NavigationMenu.Link>
		</li>
	),
);

ListItem.displayName = "ListItem";




export default NavigationMenuMain;
