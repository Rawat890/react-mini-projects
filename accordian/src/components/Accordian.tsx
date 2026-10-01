import React, { useId, useState } from 'react';
import INTERVIEW_DATA from '../data/dummy.json';
import './Accordian.css';

type QA = {
  questionTitle: string;
  answer: string;
  link: string;
};

type TopicKey = 'react' | 'express' | 'node' | 'mongodb' | 'ai' | 'docker' | 'aws';

const data = INTERVIEW_DATA as Record<TopicKey, QA[]>;

const TOPICS: { key: TopicKey; title: string; badge: string; blurb: string }[] = [
  { key: 'react', title: 'Top React questions', badge: 'Re', blurb: 'Components, hooks and rendering' },
  { key: 'express', title: 'Top Express questions', badge: 'Ex', blurb: 'Routing, middleware and errors' },
  { key: 'node', title: 'Top Node questions', badge: 'No', blurb: 'Event loop, streams and modules' },
  { key: 'mongodb', title: 'Top MongoDB questions', badge: 'Mo', blurb: 'Queries, indexes and data modeling' },
  { key: 'ai', title: 'Top AI questions', badge: 'AI', blurb: 'LLMs, RAG, prompts and agents' },
  { key: 'docker', title: 'Top Docker questions', badge: 'Dk', blurb: 'Images, containers and Compose' },
  { key: 'aws', title: 'Top AWS deployment questions', badge: 'Aw', blurb: 'EC2, ECS, S3 and CI/CD' },
];

export const Accordian = () => {
  const uid = useId();
  const [openTopic, setOpenTopic] = useState<TopicKey | null>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleTopic = (key: TopicKey) => {
    setOpenTopic((prev) => (prev === key ? null : key));
    setOpenQuestion(null); // each topic starts with all answers closed
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion((prev) => (prev === index ? null : index));
  };

  return (
    <section className="iq">
      <header className="iq__intro">
        <h1 className="iq__title">Full stack interview questions</h1>
        <p className="iq__lead">
          Choose a topic, open a question to see the answer, and follow the link when you want the full documentation.
        </p>
      </header>

      <div className="iq__topics">
        {TOPICS.map((topic) => {
          const isTopicOpen = openTopic === topic.key;
          const questions = data[topic.key];
          const triggerId = `${uid}-${topic.key}-trigger`;
          const panelId = `${uid}-${topic.key}-panel`;

          return (
            <article
              key={topic.key}
              className={`iq-topic iq-topic--${topic.key}`}
              data-open={isTopicOpen}
            >
              <h2 className="iq-topic__heading">
                <button
                  type="button"
                  id={triggerId}
                  className="iq-topic__trigger"
                  aria-expanded={isTopicOpen}
                  aria-controls={panelId}
                  onClick={() => toggleTopic(topic.key)}
                >
                  <span className="iq-topic__badge" aria-hidden="true">
                    {topic.badge}
                  </span>
                  <span className="iq-topic__text">
                    <span className="iq-topic__name">{topic.title}</span>
                    <span className="iq-topic__meta">{topic.blurb}</span>
                  </span>
                  <span className="iq-topic__count">{questions.length} questions</span>
                  <span className="iq-chevron" aria-hidden="true" />
                </button>
              </h2>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="iq-panel"
                data-open={isTopicOpen}
              >
                <div className="iq-panel__inner">
                  <ul className="iq-list">
                    {questions.map((q, i) => {
                      const isQuestionOpen = openQuestion === i;
                      const qTriggerId = `${uid}-${topic.key}-q${i}-trigger`;
                      const qPanelId = `${uid}-${topic.key}-q${i}-panel`;

                      return (
                        <li key={q.questionTitle} className="iq-item" data-open={isQuestionOpen}>
                          <h3 className="iq-item__heading">
                            <button
                              type="button"
                              id={qTriggerId}
                              className="iq-item__trigger"
                              aria-expanded={isQuestionOpen}
                              aria-controls={qPanelId}
                              onClick={() => toggleQuestion(i)}
                            >
                              <span className="iq-item__title">{q.questionTitle}</span>
                              <span className="iq-toggle" aria-hidden="true" />
                            </button>
                          </h3>

                          <div
                            id={qPanelId}
                            role="region"
                            aria-labelledby={qTriggerId}
                            className="iq-panel"
                            data-open={isQuestionOpen}
                          >
                            <div className="iq-panel__inner">
                              <div className="iq-answer">
                                <p className="iq-answer__text">{q.answer}</p>
                                <a
                                  className="iq-answer__link"
                                  href={q.link}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Read the docs
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <path d="M14 4h6v6" />
                                    <path d="M20 4 10 14" />
                                    <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};