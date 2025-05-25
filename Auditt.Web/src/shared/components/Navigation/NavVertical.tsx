import { JSX } from 'react';
import { ButtonModel, NavVerticalItemModel } from './Model';
import {SimpleNavItem} from './SimpleNavItem';

const NavVertical = ({
	title,
	items,
	children,
	buttonFooter,
}: {
	title: string;
	items?: NavVerticalItemModel[];
	children?: JSX.Element;
	buttonFooter?: ButtonModel;
}) => {
	const handleGuardar = () => {
		if (buttonFooter?.actionClick) {
			buttonFooter.actionClick();
		}
	};

	return (
		<div className="bg-slate-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full">
			<div className="text-center p-2">
				<h3 className="box-title">{title}</h3>
			</div>
			<div className="box-body p-none">
				<div className="w-full text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
					{items?.map((x) => {
						return (
							<SimpleNavItem
								key={x.id}
								to={x.url}
								title={x.name}
							/>
						);
					})}
					{children ?? null}
				</div>
			</div>
			{buttonFooter && (
				<div className="box-footer">
					<a
						onClick={handleGuardar}
						className={`${buttonFooter.className || 'btn btn-success'} pull-right`}
					>
						{buttonFooter?.fontIcon || ''} {buttonFooter.name}
					</a>
				</div>
			)}
		</div>
	);
};

export default NavVertical;
