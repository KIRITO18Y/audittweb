import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar } from "../Progress/Bar";
import './EmptyData.css';
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export type ThemeEmpty = 'empty' | 'not-permit' | 'not-found' | 'download';

export const EmptyData = ({ message = 'No hay datos para mostrar', theme = 'empty' }: { message?: string; theme?: ThemeEmpty }) => {
	return (
		<div className="emty-data_content">
			{theme === 'empty' && (
				<div className="emty-data">
					<FontAwesomeIcon icon={faFolderOpen} className="emty-data_icon" />
					<h3> {message}</h3>
				</div>
			)}

			{theme === 'not-permit' && (
				<div className="emty-data emty-data_not-permit">
					<i className="fa fa-lock emty-data_icon"></i> <h3> {message}</h3>
				</div>
			)}

			{theme === 'not-found' && (
				<div className="emty-data emty-data_not-found">
					<i className="fa fa-folder-open-o emty-data_icon"></i> <h3> {message}</h3>
				</div>
			)}

			{theme === 'download' && (
				<div className="emty-data emty-data_download">
					<div>
						<Bar Title="Descargando..." />
					</div>
					<i className="fa fa-download emty-data_icon"></i> <h3> {message}</h3>
				</div>
			)}
		</div>
	);
};
