import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';

type ArticleParamForm = {
	setFormStateStyles: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ setFormStateStyles }: ArticleParamForm) => {
	const [formOpen, setFormOpen] = useState<boolean>(false);
	const [formStateNow, setFormStateNow] =
		useState<ArticleStateType>(defaultArticleState);

	const refForm = useRef<HTMLFormElement | null>(null);
	const refButton = useRef<HTMLDivElement | null>(null);

	const toggleForm = () => setFormOpen((value) => !value);

	const handleChange =
		<K extends keyof ArticleStateType>(key: K) =>
		(value: ArticleStateType[K]) =>
			setFormStateNow((prev) => ({ ...prev, [key]: value }));

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (!refForm.current || !refButton.current) return;
			if (
				!refForm.current.contains(e.target as Node) &&
				!refButton.current.contains(e.target as Node) &&
				formOpen
			) {
				setFormOpen(false);
			}
		};
		if (!formOpen) {
			return;
		}
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [formOpen]);

	return (
		<>
			<ArrowButton isOpen={formOpen} onClick={toggleForm} ref={refButton} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formOpen,
				})}>
				<form className={styles.form} ref={refForm}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						placeholder={defaultArticleState.fontFamilyOption.title}
						title='шрифт'
						selected={formStateNow.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='размер шрифта'
						title='размер шрифта'
						selected={formStateNow.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						placeholder={defaultArticleState.fontColor.title}
						title='цвет шрифта'
						selected={formStateNow.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						placeholder={defaultArticleState.backgroundColor.title}
						title='цвет фона'
						selected={formStateNow.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						placeholder={defaultArticleState.fontSizeOption.title}
						title='ширина контента'
						selected={formStateNow.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setFormStateStyles(defaultArticleState);
								setFormStateNow(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={(event) => {
								event.preventDefault();
								setFormStateStyles(formStateNow);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
