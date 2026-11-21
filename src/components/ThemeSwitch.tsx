import './ThemeSwitch.css';

type Props = {
  /** true = 深色主题（月亮 + 星星） */
  checked: boolean;
  onChange: () => void;
  label: string;
};

/**
 * 太阳 / 月亮切换开关。
 * 视觉与动效来自 uiverse.io（RiccardoRapelli / jolly-chicken-91），
 * 这里把原来的 id 选择器（#input、#moon-dot-1 …）全部改成类名，
 * 免得和页面里其他 id 撞车。
 */
export default function ThemeSwitch({ checked, onChange, label }: Props) {
  return (
    <label className="theme-switch">
      <input
        className="theme-switch__input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
      <span className="theme-switch__slider">
        <span className="theme-switch__orb">
          <svg className="theme-switch__moon-dot theme-switch__moon-dot--1" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="theme-switch__moon-dot theme-switch__moon-dot--2" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="theme-switch__moon-dot theme-switch__moon-dot--3" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>

          <svg className="theme-switch__ray theme-switch__ray--1" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="theme-switch__ray theme-switch__ray--2" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className="theme-switch__ray theme-switch__ray--3" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>

          <svg
            className="theme-switch__cloud theme-switch__cloud--dark theme-switch__cloud--1"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="theme-switch__cloud theme-switch__cloud--light theme-switch__cloud--2"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="theme-switch__cloud theme-switch__cloud--dark theme-switch__cloud--3"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="theme-switch__cloud theme-switch__cloud--light theme-switch__cloud--4"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="theme-switch__cloud theme-switch__cloud--light theme-switch__cloud--5"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="theme-switch__cloud theme-switch__cloud--light theme-switch__cloud--6"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
        </span>

        <span className="theme-switch__stars">
          {[1, 2, 3, 4].map((n) => (
            <svg
              key={n}
              className={`theme-switch__star theme-switch__star--${n}`}
              viewBox="0 0 20 20"
            >
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
          ))}
        </span>
      </span>
    </label>
  );
}
