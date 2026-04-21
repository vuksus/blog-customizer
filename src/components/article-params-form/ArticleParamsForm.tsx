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

type ArcticleForm = {
	setFormState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ setFormState }: ArcticleForm) => {
	const [formOpen, setFormOpen] = useState<boolean>(false);
	const [formTime, setFormTime] =
		useState<ArticleStateType>(defaultArticleState);

	const refForm = useRef<HTMLFormElement | null>(null);
	const refButton = useRef<HTMLDivElement | null>(null);

	const toggleForm = () => setFormOpen((value) => !value);

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
						selected={formTime.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							setFormTime((prevState) => ({
								...prevState,
								fontFamilyOption: value,
							}))
						}
					/>
					<RadioGroup
						name='размер шрифта'
						title='размер шрифта'
						selected={formTime.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) =>
							setFormTime((prevState) => ({
								...prevState,
								fontSizeOption: value,
							}))
						}
					/>
					<Select
						placeholder={defaultArticleState.fontColor.title}
						title='цвет шрифта'
						selected={formTime.fontColor}
						options={fontColors}
						onChange={(value) =>
							setFormTime((prevState) => ({ ...prevState, fontColor: value }))
						}
					/>
					<Separator />
					<Select
						placeholder={defaultArticleState.backgroundColor.title}
						title='цвет фона'
						selected={formTime.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							setFormTime((prevState) => ({
								...prevState,
								backgroundColor: value,
							}))
						}
					/>
					<Select
						placeholder={defaultArticleState.fontSizeOption.title}
						title='ширина контента'
						selected={formTime.contentWidth}
						options={contentWidthArr}
						onChange={(value) =>
							setFormTime((prevState) => ({
								...prevState,
								contentWidth: value,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setFormState(defaultArticleState);
								setFormTime(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={(event) => {
								event.preventDefault();
								setFormState(formTime);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
