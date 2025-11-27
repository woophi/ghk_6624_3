import { Button } from '@alfalab/core-components/button/cssm';
import { Collapse } from '@alfalab/core-components/collapse/cssm';
import { Divider } from '@alfalab/core-components/divider/cssm';
import { Gap } from '@alfalab/core-components/gap/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Slider } from '@alfalab/core-components/slider/cssm';
import { Status } from '@alfalab/core-components/status/cssm';
import { Steps } from '@alfalab/core-components/steps/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { useEffect, useState } from 'react';
import fileImg from './assets/file.png';
import hb from './assets/hb.png';
import houseImg from './assets/house.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { formatWord } from './utils/words';

const SLIDER_SUM = {
  default: 500_000,
  min: 1_000,
  max: 10_000_000,
  step: 1_000,
};

const PERCENT = 0.1801;
const faqs = [
  {
    question: 'Есть ли комиссия?',
    answer: ['Комиссия удерживается согласно вашему тарифу брокерского обслуживания.'],
  },
  {
    question: 'Как выплачивается доход?',
    answer: ['Доход начисляется на брокерский счет.'],
  },
  {
    question: 'Есть ли налог?',
    answer: ['Налог начисляется на доход.'],
  },
  {
    question: 'Можно ли вывести деньги до конца срока?',
    answer: ['Можно в любой момент, продав все активы.'],
  },
];

const advantages = [
  {
    title: 'Высокая доходность',
    description: 'При долгом сроке инвестирования и регулярных пополнениях',
    img: houseImg,
  },
  {
    title: 'Активное управление',
    description: 'Профессиональная управляющая компания делает всё за вас',
    img: fileImg,
  },
];

const LINK = 'alfabank://investments/open_investments_account?type=BS';

const fonds = [
  {
    name: 'Накопительный',
    forPpl: 'Для осторожных инвесторов',
    risk: 'НИЗКИЙ РИСК',
    color: 'green',
    income: '9-12%',
    itemBlue: {
      text: '99.8% корпоративные облигации',
      width: '95%',
    },
    itemPink: {
      text: '0,2% ценные бумаги РФ',
    },
  },
  {
    name: 'Облигации Плюс',
    forPpl: 'Для сбалансированного дохода',
    risk: 'СРЕДНИЙ РИСК',
    color: 'orange',
    income: '11-32%',
    itemBlue: {
      text: '61,7% корпоративные облигации',
      width: '62%',
    },
    itemPink: {
      text: '38,3% ценные бумаги РФ',
    },
  },
  {
    name: 'Ликвидные акции',
    forPpl: 'Для агрессивных инвесторов',
    risk: 'ВЫСОКИЙ РИСК',
    color: 'red',
    income: '9-33%',
    itemBlue: {
      text: '84,7% акции',
      width: '85%',
    },
    itemPink: {
      text: '15,3% ценные бумаги РФ',
    },
  },
];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [sliderSum, setSliderSum] = useState(SLIDER_SUM.default);
  const [sliderTerm, setSliderTerm] = useState(12);
  const [collapsedItems, setCollapsedItem] = useState<string[]>([]);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const incomeProfitWithSum = Math.floor(((sliderSum * PERCENT) / 12) * sliderTerm);

  const submit = () => {
    window.gtag('event', '6624_card_activate', { var: 'var3' });
    setLoading(true);

    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    //   setThx(true);
    //   setLoading(false);
    // });
    LS.setItem(LSKeys.ShowThx, true);
    window.location.replace(LINK);
    setLoading(false);
  };

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <Typography.TitleResponsive tag="h1" view="large" font="system" weight="semibold">
            Фонды
          </Typography.TitleResponsive>
          <Typography.Text view="primary-small" color="secondary">
            Паевые инвестиционные фонды (ПИФ) — общий фонд инвесторов. Управляющая компания инвестирует деньги, вы получаете
            пай и доход от роста портфеля
          </Typography.Text>

          <img src={hb} alt="hb" width="100%" height={133} style={{ objectFit: 'contain' }} />
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Преимущества
        </Typography.TitleResponsive>

        {advantages.map((adv, index) => (
          <PureCell key={index}>
            <PureCell.Graphics verticalAlign="center">
              <img src={adv.img} width={48} height={48} alt="house" />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                  {adv.title}
                </Typography.TitleResponsive>

                <Typography.Text view="primary-small" color="secondary">
                  {adv.description}
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Сравните
        </Typography.TitleResponsive>

        <div className={appSt.boxTable}>
          <div className={appSt.boxTableCell()}>
            <Typography.Text view="primary-small" weight="bold" style={{ marginBottom: '12px' }}>
              Депозит
            </Typography.Text>
            <Typography.Text view="secondary-medium">До 16% годовых</Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Фиксированная ставка</Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Страхование АСВ</Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Потеря % при досрочном снятии</Typography.Text>
          </div>
          <div className={appSt.boxTableCell({ filled: true })}>
            <Typography.Text view="primary-small" weight="bold" style={{ marginBottom: '12px' }}>
              Фонды
            </Typography.Text>
            <Typography.Text view="secondary-medium">до 33% годовых</Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Гибкая доходность</Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Не застраховано</Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Накопленный доход сохраняется</Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Как это работает
        </Typography.TitleResponsive>

        <Steps isVerticalAlign={true} interactive={false} className={appSt.stepStyle}>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Открываете брокерский счет
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Прям в мобильном приложении банка
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Покупаете паи фонда
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Подобрали для вас наиболее интересные
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Получаете доход
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Проценты начисляются ежедневно на ваш счёт
            </Typography.Text>
          </span>
        </Steps>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Типы фондов для начинающих
        </Typography.TitleResponsive>

        {fonds.map((fond, index) => (
          <div className={appSt.boxInfo} key={index}>
            <div>
              <Status view="contrast" color={fond.color as 'red' | 'green' | 'orange'} size={20}>
                <Typography.Text view="secondary-small" weight="bold">
                  {fond.risk}
                </Typography.Text>
              </Status>
            </div>

            <div>
              <Typography.TitleResponsive tag="h4" view="small" font="system" weight="semibold">
                {fond.name}
              </Typography.TitleResponsive>
              <Typography.Text view="primary-small">{fond.forPpl}</Typography.Text>
            </div>

            <div>
              <Typography.Text view="component-secondary" color="secondary" className={appSt.row}>
                Доходность:
                <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="bold" color="positive">
                  {fond.income}
                </Typography.TitleResponsive>
              </Typography.Text>
            </div>

            <div className={appSt.btms}>
              <Typography.Text view="component-secondary" color="secondary">
                Состав портфеля
              </Typography.Text>

              <div className={appSt.progressBarContainer}>
                <div className={appSt.progressBarFill} style={{ width: fond.itemBlue.width }} />
              </div>

              <div className={appSt.row}>
                <div className={appSt.dot({ color: 'blue' })} />
                <Typography.Text view="component-secondary" color="secondary">
                  {fond.itemBlue.text}
                </Typography.Text>
              </div>
              <div className={appSt.row}>
                <div className={appSt.dot({ color: 'pink' })} />
                <Typography.Text view="component-secondary" color="secondary">
                  {fond.itemPink.text}
                </Typography.Text>
              </div>
            </div>
          </div>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Расчитайте доход
        </Typography.TitleResponsive>

        <div className={appSt.boxCalc}>
          <div>
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-medium" color="secondary">
                Сумма инвестиций
              </Typography.Text>
              <Typography.Text view="primary-medium" weight="medium">
                {sliderSum.toLocaleString('ru')} ₽
              </Typography.Text>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Slider
                size={4}
                value={sliderSum}
                step={SLIDER_SUM.step}
                min={SLIDER_SUM.min}
                max={SLIDER_SUM.max}
                onChange={({ value }) => setSliderSum(value)}
              />
            </div>
          </div>

          <div>
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-medium" color="secondary">
                Срок
              </Typography.Text>
              <Typography.Text view="primary-medium" weight="medium">
                {formatWord(sliderTerm, ['месяц', 'месяца', 'месяцев'])}
              </Typography.Text>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Slider
                size={4}
                value={sliderTerm}
                min={0}
                max={120}
                step={1}
                onChange={({ value }) => setSliderTerm(value)}
              />
            </div>
          </div>

          <div className={appSt.rowSb}>
            <Typography.Text view="primary-medium" color="secondary">
              Потенциальный доход
            </Typography.Text>
            <Typography.Text view="primary-medium" weight="medium">
              {incomeProfitWithSum.toLocaleString('ru')} ₽
            </Typography.Text>
          </div>
        </div>

        <Typography.Text view="secondary-large" color="secondary">
          Расчёт дохода примерный, деньги можно снять в любой момент
        </Typography.Text>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Дополнительные вопросы
        </Typography.TitleResponsive>

        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              onClick={() => {
                window.gtag('event', '6624_card_faq', { faq: String(index + 1), var: 'var3' });

                setCollapsedItem(items =>
                  items.includes(String(index + 1))
                    ? items.filter(item => item !== String(index + 1))
                    : [...items, String(index + 1)],
                );
              }}
              className={appSt.rowSb}
            >
              <Typography.Text view="primary-medium" weight="medium">
                {faq.question}
              </Typography.Text>
              {collapsedItems.includes(String(index + 1)) ? (
                <div style={{ flexShrink: 0 }}>
                  <ChevronUpMIcon />
                </div>
              ) : (
                <div style={{ flexShrink: 0 }}>
                  <ChevronDownMIcon />
                </div>
              )}
            </div>
            <Collapse expanded={collapsedItems.includes(String(index + 1))}>
              {faq.answer.map((answerPart, answerIndex) => (
                <Typography.Text key={answerIndex} tag="p" defaultMargins={false} view="primary-medium">
                  {answerPart}
                </Typography.Text>
              ))}
            </Collapse>
          </div>
        ))}
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <Button loading={loading} block view="primary" onClick={submit}>
          Открыть счет
        </Button>
      </div>
    </>
  );
};
