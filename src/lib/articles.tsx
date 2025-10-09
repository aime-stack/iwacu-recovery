export interface Article {
    id: number;
    title: string;
    slug: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    category: 'education' | 'recovery' | 'mentalHealth' | 'wellness';
    image?: string;
    readTime?: string;
  }
  
  export const articles: Article[] = [
    {
      id: 1,
      title: "A Wedding, A Bottle, and a Reminder: What Our Love for Alcohol Says About Us",
      slug: "wedding-bottle-reminder-what-alcohol-says-about-us",
      author: "Rev. Dr. Jean Claude MUREKEYIMANA",
      date: "2024-08-26",
      excerpt: "This paper explores the complex relationship between humans and alcohol, using a reflective narrative from a wedding setting to examine broader social, psychological, and spiritual implications.",
      content: `
        <div class="article-content">
          <section class="abstract bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">Abstract</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              This paper explores the complex relationship between humans and alcohol, using a reflective narrative 
              from a wedding setting to examine broader social, psychological, and spiritual implications. Observations 
              reveal that alcohol functions both as a source of celebration and as a mechanism for coping with emotional 
              pain, cultural pressure, or addiction. Through personal reflection and narrative analysis, the study 
              highlights the visible consequences of alcohol use, including physical harm, impaired social engagement, 
              and relational strain.
            </p>
            <p class="text-slate-800 leading-relaxed">
              The article emphasizes that alcohol consumption serves as a mirror of underlying desires, needs, and 
              unresolved struggles, prompting deeper questions about human behavior and spiritual fulfillment. By 
              integrating scholarly research and personal experience, this paper underscores the importance of awareness, 
              compassionate intervention, and self-reflection in addressing alcohol-related challenges. Ultimately, it 
              calls readers to examine not only why they drink but also what they are truly seeking beyond the bottle.
            </p>
            <div class="mt-4 pt-4 border-t border-blue-200">
              <p class="text-sm font-semibold text-slate-700">Keywords:</p>
              <p class="text-sm text-slate-700">Alcohol, Social Behavior, Addiction, Coping Mechanisms, Reflection, Spirituality</p>
            </div>
          </section>
  
          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">1. Introduction: Observing Alcohol in Social Celebrations</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Social events often showcase cultural practices, and alcohol frequently takes center stage. Weddings, 
              in particular, are filled with music, laughter, and an abundance of drinks, where the presence of alcohol 
              is nearly ubiquitous. During one such celebration I attended, the contrast between joy and excess became 
              evident. While guests enjoyed themselves, the underlying patterns of consumption drew my attention, 
              prompting reflection on the deeper social and psychological factors that drive alcohol use.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              Personally, this observation reminded me that alcohol is not merely a social lubricant; it serves as a 
              lens through which we can examine human behavior, desires, and vulnerabilities.
            </p>
          </section>
  
          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">2. The Seductive Power of Alcohol</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Alcohol consumption at social gatherings often transcends mere enjoyment; it can evoke emotional dependence 
              or escapism. At the wedding, some guests were visibly intoxicated yet continued to seek more, illustrating 
              the compelling nature of alcohol. A man, disabled due to life circumstances possibly linked to alcohol, 
              reached for another drink with a sense of joy that simultaneously hinted at resilience and denial. Alcohol 
              can simultaneously represent celebration and compulsion, highlighting its complex role in human behavior.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              Personally, witnessing this scene challenged me to consider how cultural norms and individual choices 
              intertwine, shaping behaviors that are both celebratory and potentially destructive.
            </p>
          </section>
  
          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">3. The Visible Consequences of Alcohol</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              The effects of alcohol often leave visible markers: health complications, impaired coordination, and 
              social consequences. At the event, broken teeth, bruises, and weary expressions served as silent testimonies 
              to long-term struggles with alcohol. Despite the festive setting, many participants were disengaged from 
              the celebration itself, illustrating the paradox of alcohol as both facilitator of joy and source of harm. 
              In fact, excessive alcohol consumption can obscure the intended purpose of social gatherings and negatively 
              impact individuals and communities.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              Personally, observing these consequences reminded me of the importance of awareness and intervention, 
              both personally and socially, in mitigating alcohol-related harm.
            </p>
          </section>
  
          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">4. Personal Narrative and Reflection</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Having experienced a personal history with alcohol, I recognized patterns of dependence and coping 
              strategies masked as enjoyment. Alcohol can provide comfort, courage, or an illusion of power, but it 
              also carries hidden risks of addiction and social disruption. At the wedding, a guest who knew me from 
              my past drinking days approached, seeking a blessing. This moment highlighted the enduring human need 
              for guidance, compassion, and accountability, even amidst indulgence. In this vein, alcohol is not merely 
              a substance; it reflects deeper emotional, social, and spiritual realities.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              Personally, this encounter underscored that meaningful change and mentorship are possible even in 
              environments dominated by habits and social pressures.
            </p>
          </section>
  
          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">5. Alcohol as a Mirror of Human Desire</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Alcohol consumption can serve as a symbolic mirror, reflecting underlying needs and longings. Some 
              individuals drink for celebration, others for escape, while others may rely on it as a coping mechanism. 
              These varying motivations suggest that addressing alcohol use requires more than moral admonition; it 
              necessitates understanding the psychological, cultural, and emotional contexts in which drinking occurs. 
              However, alcohol consumption is complex and multifaceted, functioning as both a social tradition and a 
              potential chain of dependence.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              Personally, this insight encourages self-examination and broader social reflection: what are we truly 
              seeking when we reach for the bottle?
            </p>
          </section>
  
          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">6. Final Thought and Moral Reflection</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Ultimately, alcohol is more than a beverage; it is a reflection of human desire, pain, and resilience. 
              Social practices like weddings may normalize its consumption, but they also provide an opportunity to 
              critically examine motives and consequences. Addressing alcohol's role in society requires awareness, 
              compassion, and proactive engagement, both at the individual and community level.
            </p>
            <blockquote class="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-blue-50 rounded-r-lg">
              <p class="text-slate-800 italic mb-3 text-lg">For me, the key question is not only "Why do we drink?" but also "What are we really thirsty for?"</p>
              <p class="text-slate-800 italic">This perspective invites introspection, spiritual reflection, and responsible engagement with alcohol 
              in personal and social contexts.</p>
            </blockquote>
          </section>
  
          <section class="references bg-slate-100 p-6 rounded-lg border border-slate-200">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">References</h2>
            <ol class="space-y-3 text-sm text-slate-800 list-decimal list-inside">
              <li class="leading-relaxed">
                Baggio, S., Iglesias, K., Deline, M., & Studer, J. (2020). Alcohol use and psychosocial factors: 
                Understanding motivations and behaviors. <em>Journal of Substance Use, 25</em>(3), 211–220.
              </li>
              <li class="leading-relaxed">
                Murray, R., Nguyen, T., & Pinsky, I. (2021). Alcohol and social rituals: The interplay of culture 
                and consumption. <em>Addiction Research & Theory, 29</em>(6), 512–523.
              </li>
              <li class="leading-relaxed">
                Rehm, J., Kilian, C., Ferreira-Borges, C., Jernigan, D., Monteiro, M., Parry, C. D. H., Sánchez, 
                Z. M., & Manthey, J. (2022). Alcohol consumption and social consequences: A global perspective. 
                <em>The Lancet, 399</em>(10339), 1973–1987.
              </li>
              <li class="leading-relaxed">
                Sher, L., Oquendo, M., & Mann, J. (2021). Psychological mechanisms underlying alcohol dependence: 
                Implications for prevention and treatment. <em>Frontiers in Psychiatry, 12</em>, 658910.
              </li>
              <li class="leading-relaxed">
                World Health Organization. (2023). <em>Global status report on alcohol and health 2023</em>. WHO Press.
              </li>
            </ol>
          </section>
        </div>
      `,
      category: 'recovery',
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "When a Man Fails to Love and a Woman Fails to Submit: Understanding God's Condition for Marriage",
      slug: "when-man-fails-to-love-woman-fails-to-submit",
      author: "Rev. Dr. Jean Claude MUREKEYIMANA",
      date: "2025-08-01",
      excerpt: "This paper critically examines the biblical framework of love and submission within marriage as outlined in Ephesians 5:22–33, exploring the divine order in marital relationships and the spiritual implications when these principles are neglected.",
      content: `
        <div class="article-content">
          <section class="abstract bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">Abstract</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              This paper critically examines the biblical framework of love and submission within marriage as outlined 
              in Ephesians 5:22–33. It explores the divine order in marital relationships, highlighting the husband's 
              responsibility to love sacrificially and the wife's call to submit trustfully, within a context of equality 
              and mutual respect. Drawing from recent theological scholarship (2020–2025), the discussion evaluates the 
              spiritual and relational implications when these principles are neglected, while emphasizing God's grace 
              as the pathway to restoration.
            </p>
            <p class="text-slate-800 leading-relaxed">
              Through personal reflection and scholarly argumentation, this paper underscores that the biblical design 
              for marriage is not oppressive but a transformative blueprint that fosters harmony, mutual growth, and a 
              Christ-centered partnership.
            </p>
            <div class="mt-4 pt-4 border-t border-blue-200">
              <p class="text-sm font-semibold text-slate-700">Keywords:</p>
              <p class="text-sm text-slate-700">Love, submission, Ephesians 5, marriage, biblical design, relational harmony, divine order</p>
            </div>
          </section>

          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">1. Introduction to Love and Submission in Generational Perspective</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Across generations, the concepts of love and submission evoke intense emotional responses. While love often 
              feels natural and aspirational, submission is frequently perceived as outdated or even oppressive. However, 
              the Bible presents these principles as divine ordinances designed for harmony in marriage, not relics of an 
              ancient culture. In Ephesians 5:22–33, Paul articulates a relational order where wives are called to submit 
              to their husbands, and husbands are called to love their wives as Christ loved the church.
            </p>
            <p class="text-slate-800 leading-relaxed">
              This biblical foundation emphasizes that these directives are deeply rooted in divine wisdom and intended to 
              address the complexities of human relationships.
            </p>
          </section>

          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">2. God's Design — The Divine Order</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Marriage is not merely a legal or social contract; it is a sacred covenant that symbolizes the relationship 
              between Christ and the Church. Within this divine framework, husbands are entrusted with servant-leadership, 
              while wives are called to trust and support that leadership. Importantly, this order does not imply inequality; 
              both men and women share equal value before God but have distinct roles meant to foster harmony and growth.
            </p>
            <p class="text-slate-800 leading-relaxed mb-4">
              Research confirms that when couples embrace these complementary roles, marital satisfaction and spiritual 
              maturity tend to flourish.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              Personally, this understanding highlights that divine order in marriage is not about control but about 
              fulfilling God-ordained functions for the common good.
            </p>
          </section>

          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">3. The Man's Responsibility — Love as Christ Loves</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              The biblical command for men to "love their wives" transcends emotional affection and calls for agapē love, 
              a sacrificial and unconditional love modeled after Christ's love for the Church. This divine mandate requires 
              husbands to protect, provide for, and nurture their wives, even at personal cost. When a man fails to love 
              sacrificially, he creates an emotional and spiritual void, undermining trust and distorting the reflection of 
              Christ within the marriage.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              In my reflection, this responsibility challenges men to lead not through authority but through humility and 
              unwavering devotion, ensuring that love becomes the foundation of marital leadership.
            </p>
          </section>

          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">4. The Woman's Responsibility — Submission as Trust in God</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Submission, often misunderstood, is not synonymous with servitude or blind compliance but reflects a voluntary 
              and faith-driven trust in God's order. The Greek term hupotassō conveys alignment under loving leadership 
              rather than enforced subjugation. This type of submission requires spiritual strength, humility, and faith 
              that God works through imperfect human leadership.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              From my perspective, this redefinition empowers women to embrace submission not as weakness but as an 
              intentional act of trust in God, fostering mutual respect and relational stability.
            </p>
          </section>

          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">5. When Both Fail</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              When a man withholds love and a woman resists submission, the marital dynamic deteriorates into emotional 
              distance, conflict, and spiritual disarray. This breakdown mirrors the Genesis 3 narrative, where Adam's 
              failure to lead and Eve's deviation from her role ushered in disorder and pain. Modern studies highlight 
              similar patterns in contemporary marriages, where the absence of love and submission correlates with higher 
              rates of dissatisfaction and separation.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              Personally, I see these dynamics as evidence that ignoring divine design inevitably leads to relational 
              instability and emotional disconnection.
            </p>
          </section>

          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">6. God's Condition and the Path to Restoration</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              Despite human shortcomings, God's standards remain unchanged—men are to love, and women are to submit. The 
              pathway to restoration involves repentance, humility, and reliance on the transformative work of the Holy 
              Spirit. Research affirms that faith-centered interventions often help couples rediscover mutual love and 
              respect, leading to stronger and more fulfilling relationships.
            </p>
            <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
              Personally, this offers a profound reminder that grace is the bridge to healing and that divine empowerment 
              makes living out these principles attainable.
            </p>
          </section>

          <section class="mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">7. Conclusion and Reflection</h2>
            <p class="text-slate-800 leading-relaxed mb-4">
              God's design for marriage is not burdensome but a blueprint for mutual flourishing. When husbands lead with 
              Christlike love and wives respond with trustful submission, marriage reflects the harmony of Christ and the 
              Church.
            </p>
            <blockquote class="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-blue-50 rounded-r-lg">
              <p class="text-slate-800 italic text-lg">
                Personally, this teaching challenges me to view marital roles not as rigid prescriptions but as divine 
                pathways to intimacy, respect, and spiritual growth. With God's guidance, every couple can strive to live 
                out this calling in a way that glorifies Him.
              </p>
            </blockquote>
          </section>

          <section class="references bg-slate-100 p-6 rounded-lg border border-slate-200">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">References</h2>
            <ol class="space-y-3 text-sm text-slate-800 list-decimal list-inside">
              <li class="leading-relaxed">
                Arinze-Umobi, D. C. (2022). The hermeneutics of equality of spouses within marriage: A tall order for 
                African women. <em>ShahidiHub International Journal of Theology & Religious Studies, 2</em>(1), 51–71.
              </li>
              <li class="leading-relaxed">
                Bible-Alive. (2025). Ephesians 5:22–33: What does Christlike marriage look like? 
                https://bible-alive.com/ephesians-522-33-what-does-christlike-marriage-look-like
              </li>
              <li class="leading-relaxed">
                BibleStudyTools. (2025). What should submission look like in a Christian marriage? 
                https://www.biblestudytools.com/bible-study/topical-studies/what-should-submission-look-like-in-a-christian-marriage.html
              </li>
              <li class="leading-relaxed">
                CBE International. (2025). Misunderstanding submission, sin, and self-esteem: A theological and pastoral 
                challenge. https://www.cbeinternational.org/resource/misunderstanding-submission-sin-and-self-esteem
              </li>
              <li class="leading-relaxed">
                Seahipublications. (2022). Contextualizing Paul's theology on submission in Ephesians 5:21-33 as a 
                panacea for sustainable marital relationships in Nigeria. 
                https://www.seahipublications.org/wp-content/uploads/2024/06/IJISSHR-D-13-2022.pdf
              </li>
              <li class="leading-relaxed">
                Spark Discipleship. (2024). The role of submission in marriage: Insights from the Bible. 
                https://sparkdiscipleship.com/bible-study-on-submission-in-marriage
              </li>
            </ol>
          </section>
        </div>
      `,
      category: 'education',
      readTime: "15 min read"
    },
  ];
  
  // Helper functions
  export function getArticlesByCategory(category: Article['category']): Article[] {
    return articles
      .filter(article => article.category === category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find(article => article.slug === slug);
  }
  
  export function getAllArticles(): Article[] {
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  export function getRecentArticles(limit: number = 5): Article[] {
    return getAllArticles().slice(0, limit);
  }