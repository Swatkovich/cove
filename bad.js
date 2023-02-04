/**
 * Please, improve this component and fix all problems.
 *
 * What is important:
 * - design (extensibility, testability)
 * - code cleanliness, following best practices
 * - bugs
 * - consistency
 * - naming
 * - formatting
 *
 * Write your perfect code!
 */

import { useEffect, useState } from 'react'

function Card({ title, text, target, linkTitle, href, rel, linkClassName, onClick }) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        target={target}
        href={href}
        rel={rel}
        onClick={onClick(href)}
        className={`default--link card__link ${linkClassName}`}
      >
        {linkTitle}
      </a>
    </div>
  )
}

export default function Page() {
  const [cards, setCards] = useState([])

  const fetchCardsData = async () => {
    const response = await fetch('https://my-json-server.typicode.com/savayer/demo/posts')
    const data = await response.json()

    const newData = data.map((item) => ({
      id: item.id,
      title: item.title.en,
      text: `${item.body.en.substr(0, 50)}...`,
      linkTitle: item.linkTitle,
      link: item.link,
      rel: item.rel,
    }))
    setCards(newData)
  }

  useEffect(() => {
    fetchCardsData()
  }, [])

  const analyticsTrackClick = (url) => {
    console.log(url)
  }

  return (
    <div>
      {cards.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          text={item.text}
          target={item.id === 1 ? '_blank' : ''}
          linkTitle={item.linkTitle}
          href={item.link}
          rel={item.rel}
          linkClassName={item.id === 1 ? 'card__link--red' : ''}
          onClick={analyticsTrackClick}
        />
      ))}
    </div>
  )
}
