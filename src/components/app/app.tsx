import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [formStateStyles, setFormStateStyles] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': formStateStyles.fontFamilyOption.value,
					'--font-size': formStateStyles.fontSizeOption.value,
					'--font-color': formStateStyles.fontColor.value,
					'--container-width': formStateStyles.contentWidth.value,
					'--bg-color': formStateStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setFormStateStyles={setFormStateStyles} />
			<Article />
		</main>
	);
};
