import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleStateStyles, setArticleStateStyles] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStateStyles.fontFamilyOption.value,
					'--font-size': articleStateStyles.fontSizeOption.value,
					'--font-color': articleStateStyles.fontColor.value,
					'--container-width': articleStateStyles.contentWidth.value,
					'--bg-color': articleStateStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleStateStyles={setArticleStateStyles} />
			<Article />
		</main>
	);
};
