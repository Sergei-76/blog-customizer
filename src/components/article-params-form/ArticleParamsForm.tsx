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
  const [isOpen, setIsOpen] = useState(false);
  const [articleState, setArticleState] = useState<ArticleStateType>(initialState);
  const handleApply = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(articleState);
  };
  const handleReset = (): void => {
    setArticleState(defaultArticleState);
    onApply(defaultArticleState);
  };
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleOpen = (): void => setIsOpen((prev) => !prev);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onClose: toggleOpen,
    onChange: setIsOpen,
  });

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={toggleOpen} />
      <aside
        className={
          isOpen ? `${styles.container} ${styles.container_open}` : styles.container
        }
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={articleState.fontFamilyOption}
            placeholder="Выбери шрифт"
            onChange={(option) =>
              setArticleState((s) => ({ ...s, fontFamilyOption: option }))
            }
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={articleState.fontSizeOption}
            onChange={(option) =>
              setArticleState((s) => ({ ...s, fontSizeOption: option }))
            }
          />

          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={articleState.fontColor}
            onChange={(option) => setArticleState((s) => ({ ...s, fontColor: option }))}
          />

          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={articleState.backgroundColor}
            onChange={(option) =>
              setArticleState((s) => ({ ...s, backgroundColor: option }))
            }
          />

          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={articleState.contentWidth}
            onChange={(option) =>
              setArticleState((s) => ({ ...s, contentWidth: option }))
            }
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
