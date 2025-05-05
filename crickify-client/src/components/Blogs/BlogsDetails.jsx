import React from 'react'

import ipl from '../../assets/Images/ipl.jpg'
import ipl2 from '../../assets/Images/ipl2.jpeg'

const BlogsDetails = () => {

    const text = `
        In the quiet corners of India, far from the neon lights of the big cities, life moved at its own humble pace. There, amidst the dusty lanes and open fields, cricket wasn’t just a sport — it was a language. A way of dreaming, of escaping, of believing that someday, somehow, life could be bigger than the village, the town, the small beginnings.

        There was a boy — or maybe hundreds like him — who picked up a battered bat long before he learned how to read properly. His first pitch wasn’t a manicured ground; it was a broken street, flanked by old houses and buzzing with the laughter of children.

        He didn’t have a proper coach. He didn't own shiny pads or branded gloves. All he had was a piece of wood carved into a bat by a local carpenter, a rubber ball softened by months of wear, and a spirit that refused to listen to the voice of limitations.

        Every morning, he woke up before the sun. While the town still slept, he practiced shadow shots by himself — swinging at invisible balls, perfecting strokes nobody was there to applaud.

        His fingers bled. His body ached. But he smiled, because he knew... every drop of sweat was a letter he was writing to his future.

        During the day, he attended school, helped his parents in their small shop, ran errands. But his mind was always on cricket.

        The afternoons were a battleground — improvised matches on the street, stones for wickets, loud arguments over "out" or "not out", joyous celebrations for every boundary. There were no cameras, no viral videos, no agents watching.

        Just pure, raw love for the game. But dreaming was not easy.

        His neighbors laughed at him. "Get real," they said. "No one from here ever makes it to the big leagues."

        His relatives suggested he find a stable job instead — something safe, something ordinary. Life kept whispering in his ear: "You're not enough."

        But inside him, a louder voice roared: "Why not me?" And so he kept playing.

        Kept dreaming. Kept believing.

        One day, a local coach spotted him. Not because he had fancy gear — but because he had something you couldn’t teach: fire.

        He got invited to a bigger city. There, he trained on real pitches for the first time.

        He saw players with professional coaching, gym-honed bodies, nutrition plans. And for a moment, doubt crept in.

        "Maybe I’m too late." "Maybe this was never meant for someone like me."

        But then he remembered: The streets had taught him resilience no academy ever could.

        The hunger inside him was stronger than the fear outside. He fought.

        Day after day. Match after match.

        He rose through the ranks — from district cricket to state-level tournaments. And then came the IPL trials.

        The biggest stage of them all. The dream that once seemed a lifetime away was now just a boundary shot away.

        Under the blinding lights, facing bowlers clocking 140 km/h, standing among players he once idolized, he didn’t flinch.

        He remembered the cracked streets. The stitched-up balls.

        The thousands of unseen hours. He carried the spirit of every boy who had ever dreamed with nothing but a bat and a heart full of hope.

        When he connected the ball that day — the sound echoed not just across the stadium but across every small town, every broken street, every child's heart where dreams were waiting for permission to bloom.

        He was selected. From dusty lanes to sold-out stadiums.

        From a nobody to a name chanted by thousands. From dreams whispered in the dark to history written under the brightest lights.

        But he never forgot where it started. Every time he stepped onto the field, he played for the boy who once batted with a stick.

        For the kids who still play barefoot, chasing tennis balls across the fields. For the belief that it doesn’t matter where you come from — it matters how fiercely you dream.
    `;

    return (
        <>
            <div className='pl-4 py-[3%]'>
                <div>
                    <p className='text-center text-7xl font-bold w-[1200px] mx-auto'>
                        From the Streets to the Stadium: Dreams of the IPL
                    </p>
                    <div className="mx-auto mt-5 flex justify-center">
                        <img src={ipl2} alt="ipl" className="rounded-l-2xl" />
                        <img src={ipl} alt="ipl" className="rounded-r-xl" />
                    </div>
                    <div className='mx-auto w-[1200px] mt-10'>
                        {text.split(". ").reduce((acc, sentence, index) => {
                            if (index % 2 === 0) {
                                acc.push(sentence);
                            } else {
                                acc[acc.length - 1] += ". " + sentence + ".";
                            }
                            return acc;
                        }, []).map((paragraph, index) => (
                            <p key={index} style={{ marginBottom: "20px", fontSize: "22px", lineHeight: "1.7", }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogsDetails