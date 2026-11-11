import {
  fontFamilyOptions,
  fontColors,
  fontSizeOptions,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  type ArticleStateType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { useOutsideClickClose } from '@/ui/select/hooks/useOutsideClickClose';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useRef, type FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  initialState: ArticleStateType;
  onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  initialState,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isParamsPanelOpen, setIsParamsPanelOpen] = useState(false);
  const [formParamsState, setFormParamsState] = useState<ArticleStateType>(initialState);
  const handleChange = <K extends keyof ArticleStateType>(
    field: K,
    value: ArticleStateType[K]
  ): void => {
    setFormParamsState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleApply = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formParamsState);
  };
  const handleReset = (): void => {
    setFormParamsState(defaultArticleState);
    onApply(defaultArticleState);
  };
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleOpen = (): void => setIsParamsPanelOpen((prev) => !prev);

  useOutsideClickClose({
    isOpen: isParamsPanelOpen,
    rootRef,
    onClose: toggleOpen,
    onChange: setIsParamsPanelOpen,
  });

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isParamsPanelOpen} onClick={toggleOpen} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isParamsPanelOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formParamsState.fontFamilyOption}
            placeholder="Выбери шрифт"
            onChange={(option) => handleChange('fontFamilyOption', option)}
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={formParamsState.fontSizeOption}
            onChange={(option) => handleChange('fontSizeOption', option)}
          />

          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formParamsState.fontColor}
            onChange={(option) => handleChange('fontColor', option)}
          />

          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formParamsState.backgroundColor}
            onChange={(option) => handleChange('backgroundColor', option)}
          />

          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formParamsState.contentWidth}
            onChange={(option) => handleChange('contentWidth', option)}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
