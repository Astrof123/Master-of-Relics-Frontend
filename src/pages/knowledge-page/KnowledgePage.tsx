import { useState } from "react";
import styles from "./KnowledgePage.module.css";
import clsx from "clsx";
import GoalImg from "@assets/icons/goal.png";
import PrepareImg from "@assets/icons/prepare.png";
import Swords from "@assets/icons/two-swords.png";
import Trophy from "@assets/icons/trophy.png";
import Logs from "@assets/icons/logs.png";
import Settings from "@assets/icons/settings.png";
import Dice from "@assets/icons/dice.png";
import Bow from "@assets/icons/bow.png";
import Heart from "@assets/icons/heart.png";
import Agility from "@assets/icons/agility.svg";
import Rage from "@assets/icons/rage.svg";
import LightMana from "@assets/icons/light_mana.svg";
import Mage from "@assets/icons/mage.png";
import Effect from "@assets/icons/effect.png";
import State from "@assets/icons/state.png";

import SwordFace from "@assets/faces/sword_x1.svg";
import AgilityFace from "@assets/faces/agility_x1.svg";
import HeartFace from "@assets/faces/heart_x1.svg";
import LightManaFace from "@assets/faces/light_mana_x1.svg";
import DarkManaFace from "@assets/faces/dark_mana_x1.svg";
import DestructionManaFace from "@assets/faces/destruction_mana_x1.svg";
import RageFace from "@assets/faces/rage_x1.svg";
import TargetFace from "@assets/faces/target_x1.svg";

type TabType = "rules" | "mechanics" | "resources" | "interface";

function KnowledgePage() {
    const [activeTab, setActiveTab] = useState<TabType>("rules");

    const tabs = [
        { id: "rules" as TabType, name: "Правила игры", icon: Logs },
        { id: "mechanics" as TabType, name: "Механики", icon: Settings },
        { id: "resources" as TabType, name: "Ресурсы и символы", icon: Dice },
    ];

    return (
        <div className={styles["knowledge-container"]}>
            <h1 className={styles["title"]}>База знаний</h1>
            
            <div className={styles["tabs"]}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={clsx(
                            styles["tab"],
                            activeTab === tab.id && styles["tab--active"]
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <img className={styles["tab-icon"]} src={tab.icon} alt="" />
                        <span className={styles["tab-name"]}>{tab.name}</span>
                    </button>
                ))}
            </div>

            <div className={styles["content"]}>
                {activeTab === "rules" && (
                    <div className={styles["section"]}>
                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={GoalImg} alt="" />
                                <h2>Цель игры</h2>
                            </div>
                            <p>Сломать все 7 предметов противника. Ваши предметы — это ваша жизнь.</p>
                        </div>

                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={PrepareImg} alt="" />
                                <h2>Подготовка к матчу</h2>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Коллекция</h3>
                                <p>Каждый игрок имеет свою личную коллекцию предметов. При регистрации игроки получают базовый набор, а далее могут покупать новые карты за игровую валюту, которую получают за бои.</p>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Формирование колоды</h3>
                                <p>Перед игрой каждый игрок в своем профиле формирует колоду предметов из 14 карт, которые будут использоваться для драфта.</p>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Процесс драфта</h3>
                                <ol>
                                    <li>На экране каждый игрок видит все 14 карт из своей персональной колоды, а также может посмотреть колоду соперника.</li>
                                    <li>Игроки одновременно выбирают по одной карте в закрытую, пока у каждого не наберется 7 карт предметов.</li>
                                    <li>Выбранные 7 предметов формируют вашу боевую раскладку.</li>
                                </ol>
                                <p className={styles["note"]}>Стандартный набор заклинаний света, тьмы и разрушения автоматически доступен в бою.</p>
                            </div>
                        </div>

                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={Swords} alt="" />
                                <h2>Структура боя</h2>
                            </div>
                            
                            <div className={styles["sub-section"]}>
                                <h3>Фаза 1: Начало раунда</h3>
                                <ol>
                                    <li><strong>Обновление:</strong> В начале каждого раунда все предметы и заклинания переводятся в состояние «Готов к бою».</li>
                                    <li><strong>Перестановка:</strong> Вы можете бесплатно менять местами свои предметы на поле и переводить их с передовой линии на тыловую и обратно.</li>
                                    <li><strong>Бросок кубиков:</strong> Все ваши предметы автоматически бросают свои кубики.</li>
                                    <li><strong>Определение инициативы:</strong> Первым ходит тот игрок, у которого меньше целых (не сломанных) артефактов. При равенстве — считается общее количество здоровья предметов (у кого меньше, тот и ходит).</li>
                                </ol>
                            </div>

                            <div className={styles["sub-section"]}>
                                <h3>Фаза 2: Раунд (Ходы игроков)</h3>
                                <p>Игроки ходят по очереди, начиная с выигравшего инициативу.</p>
                                <p>За один ход можно совершить <strong>ровно одно действие</strong> из списка:</p>
                                <ul>
                                    <li>Использовать грань кубика предмета (если предмет в состоянии «Готов к бою»)</li>
                                    <li>Использовать заклинание (если есть нужное количество маны)</li>
                                    <li>Активировать способность предмета (если есть нужное количество Ярости и предмет готов)</li>
                                </ul>
                                <p className={styles["note"]}>После использования кубика предмета карта приобретает статус «Перезарядка». Каждое заклинание можно использовать только один раз за раунд.</p>
                            </div>

                            <div className={styles["sub-section"]}>
                                <h3>Фаза 3: Окончание раунда</h3>
                                <p>Раунд заканчивается, когда оба игрока не имеют возможных действий (все кубики использованы и нет ресурсов) или они сами решают спасовать. Начинается новый раунд с Фазы 1.</p>
                            </div>
                        </div>

                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={Trophy} alt="" />
                                <h2>Победа</h2>
                            </div>
                            <p>Вы выигрываете матч, когда у вашего противника не остается ни одного целого предмета на поле боя.</p>
                        </div>
                    </div>
                )}

                {activeTab === "mechanics" && (
                    <div className={styles["section"]}>
                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={Bow} alt="" />
                                <h2>Линии (Позиционирование)</h2>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Передняя линия</h3>
                                <ul>
                                    <li>Защищает заднюю линию от ближнего урона</li>
                                    <li>Предмет на передней линии получает <strong className={styles["highlight"]}>+10</strong> к своему ближнему урону</li>
                                </ul>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Задняя линия</h3>
                                <ul>
                                    <li>В безопасности от ближних атак, если на передней линии есть хотя бы один живой предмет</li>
                                </ul>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Виды урона</h3>
                                <ul>
                                    <li><strong>Ближний урон (Меч):</strong> Можно наносить только по предметам на передней линии. Если её нет — по любому предмету.</li>
                                    <li><strong>Дальний урон (Прицел):</strong> Можно наносить по любому предмету, независимо от линии.</li>
                                    <li><strong>Магический урон:</strong> Можно наносить по любому предмету, независимо от линии (обычно от заклинаний).</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={Heart} alt="" />
                                <h2>Здоровье и уничтожение</h2>
                            </div>
                            <ul>
                                <li>У героя нет здоровья. Его жизнями являются предметы.</li>
                                <li>Каждый предмет имеет свое Здоровье (HP). Когда HP предмета падает до 0, он ломается и его нельзя использовать.</li>
                                <li>Символ <strong>Сердце</strong>: При выпадении этого символа на кубике вы немедленно восстанавливаете 10 HP любому своему поврежденному предмету (но не сверх максимума).</li>
                            </ul>
                        </div>

                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={Agility} alt="" />
                                <h2>Ловкость (Гибкий ресурс)</h2>
                            </div>
                            <p>Ловкость копится на персональном счетчике игрока за выпадение символа Ловкость (крылья) на кубиках. Использование ловкости <strong>не считается действием</strong>. Её можно тратить в свой ход:</p>
                            <ul>
                                <li><strong>5 Ловкости:</strong> Перебросить один свой еще неиспользованный кубик.</li>
                                <li><strong>15 Ловкость:</strong> Совершить одно дополнительное действие в этом ходу (использовать второй кубик, заклинание и т.д.).</li>
                                <li><strong>15 Ловкость:</strong> Переставить один предмет между линиями во время боя (в начале раунда — бесплатно).</li>
                                <li><strong>30 Ловкости:</strong> Вернуть один свой уже использованный кубик в состояние «Готов к бою» и перебросить его.</li>
                            </ul>
                        </div>

                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={Rage} alt="" />
                                <h2>Ярость (Ресурс для способностей)</h2>
                            </div>
                            <ul>
                                <li><strong>Накопление:</strong> Ярость копится на персональном счетчике игрока за выпадение символа Ярость (огонь) на кубиках.</li>
                                <li><strong>Использование:</strong> Тратится для активации способностей предметов. У каждой способности своя стоимость в ярости (указана на карте).</li>
                                <li><strong>Условие:</strong> Активную способность можно использовать, только если предмет «Готов к бою» (его кубик не использован в этом раунде).</li>
                            </ul>
                        </div>

                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={LightMana} alt="" />
                                <h2>Мана света, тьмы и разрушения</h2>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Мана света</h3>
                                <p>Пополняется за выпадение символа Мана света (светлая капля) на кубиках. Тратится на применение заклинаний света.</p>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Мана тьмы</h3>
                                <p>Пополняется за выпадение символа Мана тьмы (фиолетовая капля) на кубиках. Тратится на применение заклинаний тьмы.</p>
                            </div>
                            <div className={styles["sub-section"]}>
                                <h3>Мана разрушения</h3>
                                <p>Пополняется за выпадение символа Мана разрушения (красноватая капля) на кубиках. Тратится на применение заклинаний разрушения.</p>
                            </div>
                        </div>
                        <div className={styles["section"]}>
                            <div className={styles["card"]}>
                                <div className={styles["card-header"]}>
                                    <img className={styles["card-icon"]} src={Mage} alt="" />
                                    <h2>Типы способностей</h2>
                                </div>
                                <div className={styles["sub-section"]}>
                                    <h3>Активная способность</h3>
                                    <p>Требует активации через трату Ярости и использования действия.</p>
                                </div>
                                <div className={styles["sub-section"]}>
                                    <h3>Пассивная способность</h3>
                                    <p>Действует постоянно, если предмет жив.</p>
                                </div>
                            </div>

                            <div className={styles["card"]}>
                                <div className={styles["card-header"]}>
                                    <img className={styles["card-icon"]} src={State} alt="" />
                                    <h2>Состояния</h2>
                                </div>
                                <div className={styles["sub-section"]}>
                                    <h3>Оглушение</h3>
                                    <p>Предмет нельзя использовать и нельзя вернуть в бой до конца раунда.</p>
                                </div>
                                <div className={styles["sub-section"]}>
                                    <h3>Оцепенение</h3>
                                    <p>Предмет нельзя использовать. Чтобы снять, требуется потратить <strong>15 Ловкости</strong> (как действие). После снятия кубик не перебрасывается.</p>
                                </div>
                                <div className={styles["sub-section"]}>
                                    <h3>Сон</h3>
                                    <p>Предмет нельзя использовать. Чтобы сон прошел, предмет должен получить лечение или урон. После снятия кубик не перебрасывается.</p>
                                </div>
                            </div>
                        
                            <div className={styles["card"]}>
                                <div className={styles["card-header"]}>
                                    <img className={styles["card-icon"]} src={Effect} alt="" />
                                    <h2>Эффекты</h2>
                                </div>
                                <p>
                                    По ходу игры на артефакты игроков могут накладываться различные эффекты. Они могут быть положительными или негативными. Обычно эффекты длятся до конца текущего раунда.
                                    Часть эффектов можно развеять с помощью способностей или заклинаний. Сила развеиваний описана ниже.
                                </p>
                                <div className={styles["sub-section"]}>
                                    <h3>Нормальное развеивание</h3>
                                    <p>Снимает большинство базовых эффектов, изменяющих характеристики (например, защита, бонус к урону, некоторые негативные эффекты).</p>
                                </div>
                                <div className={styles["sub-section"]}>
                                    <h3>Сильное развеивание</h3>
                                    <p>Способно убрать то же, что и нормальное развеивание, а также многие другие более сильные эффекты.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "resources" && (
                    <div className={styles["section"]}>
                        <div className={styles["card"]}>
                            <div className={styles["card-header"]}>
                                <img className={styles["card-icon"]} src={Dice} alt="" />
                                <h2>Символы на кубиках</h2>
                            </div>
                            <div className={styles["symbols-grid"]}>
                                <div className={styles["symbol-card"]}>
                                    <img className={styles["symbol-icon"]} src={SwordFace} alt="" />
                                    <div className={styles["symbol-info"]}>
                                        <h4>Меч</h4>
                                        <p>Наносит 10 единиц <strong>ближнего урона</strong></p>
                                    </div>
                                </div>
                                <div className={styles["symbol-card"]}>
                                    <img className={styles["symbol-icon"]} src={TargetFace} alt="" />
                                    <div className={styles["symbol-info"]}>
                                        <h4>Прицел</h4>
                                        <p>Наносит 10 единиц <strong>дальнего урона</strong></p>
                                    </div>
                                </div>
                                <div className={styles["symbol-card"]}>
                                    <img className={styles["symbol-icon"]} src={HeartFace} alt="" />
                                    <div className={styles["symbol-info"]}>
                                        <h4>Сердце</h4>
                                        <p>Восстанавливает <strong>10 HP</strong> любому вашему предмету</p>
                                    </div>
                                </div>
                                <div className={styles["symbol-card"]}>
                                    <img className={styles["symbol-icon"]} src={LightManaFace} alt="" />
                                    <div className={styles["symbol-info"]}>
                                        <h4>Мана света</h4>
                                        <p>Дает <strong>10 единиц маны света</strong></p>
                                    </div>
                                </div>
                                <div className={styles["symbol-card"]}>
                                    <img className={styles["symbol-icon"]} src={DarkManaFace} alt="" />
                                    <div className={styles["symbol-info"]}>
                                        <h4>Мана тьмы</h4>
                                        <p>Дает <strong>10 единиц маны тьмы</strong></p>
                                    </div>
                                </div>
                                <div className={styles["symbol-card"]}>
                                    <img className={styles["symbol-icon"]} src={DestructionManaFace} alt="" />
                                    <div className={styles["symbol-info"]}>
                                        <h4>Мана разрушения</h4>
                                        <p>Дает <strong>10 единиц маны разрушения</strong></p>
                                    </div>
                                </div>
                                <div className={styles["symbol-card"]}>
                                    <img className={styles["symbol-icon"]} src={AgilityFace} alt="" />
                                    <div className={styles["symbol-info"]}>
                                        <h4>Ловкость</h4>
                                        <p>Дает <strong>10 единиц ловкости</strong></p>
                                    </div>
                                </div>
                                <div className={styles["symbol-card"]}>
                                    <img className={styles["symbol-icon"]} src={RageFace} alt="" />
                                    <div className={styles["symbol-info"]}>
                                        <h4>Ярость</h4>
                                        <p>Дает <strong>10 единиц ярости</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* {activeTab === "interface" && (

                )} */}
            </div>
        </div>
    );
}

export default KnowledgePage;