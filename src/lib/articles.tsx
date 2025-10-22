export interface Article {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  category: 'education' | 'recovery' | 'mental-health' | 'wellness';
  image?: string;
  readTime?: string;
}

// Mental Health Articles
export const mentalHealthArticles: Article[] = [
  {
    id: 4,
    title: "Finding Healing Through Mindfulness and Self-Compassion in Rwanda",
    slug: "mindfulness-retreat-rwanda",
    author: "Iwacu Recovery Centre",
    date: "2025-08-27",
    excerpt: "A deeply personal reflection on a transformative mindfulness retreat that brought together hearts, minds, and cultures from across Africa in a journey of healing and self-discovery.",
    content: `
      <div class="article-content prose prose-lg max-w-none">
        
        <p class="text-slate-600 text-sm mb-8 italic">
          Published by Iwacu Recovery Centre, August 2025
        </p>

        <p class="text-slate-800 leading-relaxed mb-6">
          There are moments in life when the world slows down — when we pause long enough to breathe, listen, and feel what&apos;s really happening inside us. That&apos;s what happened during the Mindfulness and Self-Compassion Retreat held this August in Kigali, Rwanda.
        </p>

        <p class="text-slate-800 leading-relaxed mb-6">
          For several days, a group of 25 people from Rwanda and Kenya — counselors, teachers, health workers, peacebuilders, and others — came together not just to learn, but to heal. Organized by the International Professional Counselors Centre (IPCC), the Susan Gitau Counseling Foundation (SGCF), and Iwacu Recovery Centre (IRC), the retreat was more than an event; it was a journey inward.
        </p>

        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg my-8 border-l-4 border-blue-500">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">The Space Between Healing and Hope</h2>
          
          <p class="text-slate-800 leading-relaxed mb-4">
            The theme, &quot;Mindfulness, Kindness, and Self-Compassion in Trauma Healing,&quot; felt especially fitting in Rwanda — a country that has walked a long road toward recovery and peace.
          </p>

          <p class="text-slate-800 leading-relaxed mb-4">
            Participants arrived carrying stories: of helping others, of personal loss, of exhaustion from giving so much without always having the time to refill their own cups.
          </p>

          <p class="text-slate-800 leading-relaxed mb-4">
            Through guided mindfulness sessions, reflective journaling, and deep conversations, something began to shift. There was laughter, there were tears, and there was silence — the kind that heals.
          </p>

          <p class="text-slate-800 leading-relaxed italic">
            Together, we learned that self-compassion isn&apos;t selfish; it&apos;s a radical act of love and survival.
          </p>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Lessons from Stillness</h2>

        <p class="text-slate-800 leading-relaxed mb-6">
          Each day began with quiet meditation. As the Rwandan sun rose over the hills, we practiced breathing — not just as a technique, but as a reminder that we are alive, that every breath is a chance to begin again.
        </p>

        <p class="text-slate-800 leading-relaxed mb-6">
          We explored how mindfulness and self-compassion (MSC) can help release stored pain and trauma. We learned to notice the body&apos;s signals, to name emotions without judgment, and to treat our inner struggles with the same gentleness we offer others.
        </p>

        <p class="text-slate-800 leading-relaxed mb-8">
          The group also visited Genocide Memorial sites — a sobering but powerful part of the retreat. Standing there, surrounded by history and memory, mindfulness took on a deeper meaning. Healing, we realized, isn&apos;t about forgetting; it&apos;s about finding peace in remembrance.
        </p>

        <div class="bg-slate-100 p-6 rounded-lg my-8 border-l-4 border-slate-400">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">What We Learned Together:</h3>
          <ul class="space-y-2 text-slate-800 list-disc list-inside">
            <li>How to apply MSC principles in trauma healing and emotional recovery</li>
            <li>Ways to release built-up stress, burnout, and trauma through self-awareness</li>
            <li>The importance of cultural exchange and inclusivity between Rwanda and Kenya</li>
            <li>Building a growing network of MSC trainers and practitioners across Africa</li>
            <li>Supporting Rwanda&apos;s ongoing journey of trauma healing through community outreach</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">&quot;A Space of Healing and Renewal&quot;</h2>

        <p class="text-slate-800 leading-relaxed mb-6">
          As Rev. Dr. Jean Claude Murekeyimana of Iwacu Recovery Centre shared at the closing circle:
        </p>

        <blockquote class="border-l-4 border-blue-500 pl-6 my-6 italic text-slate-700 text-lg">
          &quot;This retreat was a space of healing and renewal. It is through such initiatives that we empower communities, restore hope, and nurture peace across generations.&quot;
        </blockquote>

        <p class="text-slate-800 leading-relaxed mb-6">
          His words resonated deeply. The retreat was not only about learning methods — it was about coming home to ourselves. We carried that warmth, that gentleness, back into our work and our communities.
        </p>

        <div class="bg-gradient-to-r from-pink-50 to-blue-50 p-8 rounded-lg my-8 border-l-4 border-pink-500">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">A Ripple of Compassion</h2>
          
          <p class="text-slate-800 leading-relaxed mb-4">
            When the retreat ended, no one truly wanted to leave. But everyone left changed. There was a shared understanding that healing is not a one-time event — it&apos;s a practice, a choice we make every day.
          </p>

          <p class="text-slate-800 leading-relaxed mb-4">
            Each participant returned to their community with new energy, ready to integrate mindfulness into classrooms, therapy sessions, and even everyday conversations.
          </p>

          <p class="text-slate-800 leading-relaxed italic">
            The retreat planted seeds — of compassion, awareness, and cross-cultural connection — that will continue to grow across Rwanda, Kenya, and beyond.
          </p>
        </div>

        <div class="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-xl my-10 shadow-lg">
          <h2 class="text-3xl font-bold text-slate-900 mb-6 text-center">The Journey Continues</h2>
          
          <p class="text-slate-800 leading-relaxed mb-6 text-lg">
            In a world that often values doing over being, this retreat reminded us of the power of slowing down. Of noticing. Of choosing kindness — especially toward ourselves.
          </p>

          <p class="text-slate-800 leading-relaxed mb-6 text-lg">
            Mindfulness doesn&apos;t erase pain, but it helps us hold it differently. It teaches us that healing isn&apos;t found in perfection, but in presence.
          </p>

          <p class="text-slate-800 leading-relaxed text-lg italic">
            And sometimes, all it takes is a quiet moment in Kigali, surrounded by others who are learning to breathe again, to realize that we are not alone — and that peace begins within.
          </p>
        </div>

        <div class="mt-12 pt-8 border-t border-slate-200">
          <p class="text-slate-600 italic text-center">
            This story is an invitation to pause, reflect, and embrace the healing power of mindfulness and self-compassion in our daily lives.
          </p>
        </div>

      </div>
    `,
    category: 'mental-health',
    readTime: "6 min read"
  }
];

// Wellness Tips Articles
export const wellnessTipsArticles: Article[] = [
  {
    id: 5,
    title: "Healing Starts in the Mind: How Cognitive Behavioral Therapy (CBT) Supports Addiction Recovery",
    slug: "cbt-addiction-recovery",
    author: "Dr. Jean Claude Murekeyimana",
    date: "2025-10-15",
    excerpt: "Discover how CBT helps break free from harmful habits by transforming the way we think, building confidence, and rediscovering hope in the journey of addiction recovery.",
    content: `
      <div class="article-content prose prose-lg max-w-none">
        
        <p class="text-slate-600 text-sm mb-8 italic">
          Published by Dr. Jean Claude Murekeyimana – Iwacu Recovery Centre, October 2025
        </p>

        <p class="text-slate-800 leading-relaxed mb-6">
          Addiction is not just a battle of the body — it&apos;s a journey that begins in the mind. True healing starts when we learn to change the way we think. That&apos;s where Cognitive Behavioral Therapy (CBT) comes in.
        </p>

        <p class="text-slate-800 leading-relaxed mb-8">
          At Iwacu Recovery Centre, we&apos;ve seen how this simple yet powerful approach helps people break free from harmful habits, rebuild confidence, and rediscover hope.
        </p>

        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg my-8 border-l-4 border-blue-500">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">What Is CBT, and Why Does It Matter?</h2>
          
          <p class="text-slate-800 leading-relaxed mb-4">
            Cognitive Behavioral Therapy (CBT) is a type of talk therapy that focuses on the connection between your thoughts, feelings, and behaviors. It&apos;s based on a simple truth:
          </p>

          <blockquote class="border-l-4 border-green-500 pl-6 my-4 italic text-slate-700 text-lg">
            &quot;What we think affects how we feel, and how we feel affects what we do.&quot;
          </blockquote>

          <p class="text-slate-800 leading-relaxed mb-4">
            For example, if someone believes, &quot;I can&apos;t live without alcohol,&quot; that thought creates feelings of hopelessness — often leading them back to drinking.
          </p>

          <p class="text-slate-800 leading-relaxed italic">
            CBT helps replace that thought with something stronger, like, &quot;I&apos;ve overcome challenges before; I can do it again.&quot; Over time, those new thoughts begin to change emotions, actions, and ultimately, lives.
          </p>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Why CBT Is a Game-Changer in Addiction Recovery</h2>

        <p class="text-slate-800 leading-relaxed mb-6">
          Addiction often feeds on negative self-talk — guilt, fear, and the belief that change isn&apos;t possible. CBT teaches us how to break that cycle by:
        </p>

        <div class="bg-slate-100 p-6 rounded-lg my-8 border-l-4 border-slate-400">
          <ul class="space-y-3 text-slate-800">
            <li class="flex items-start">
              <span class="font-semibold mr-2">→</span>
              <span><strong>Recognizing triggers</strong> and the thoughts that come before harmful actions</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">→</span>
              <span><strong>Challenging self-defeating beliefs</strong> like &quot;I&apos;ll never get better&quot;</span>
            </li>
            <li class="flex items-start">
              <span class="font-semibold mr-2">→</span>
              <span><strong>Building new coping skills</strong> for dealing with stress, loneliness, or anxiety</span>
            </li>
          </ul>
        </div>

        <p class="text-slate-800 leading-relaxed mb-8 font-semibold text-lg">
          By working on the mind, CBT transforms the behavior that follows.
        </p>

        <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">How You Can Use CBT in Everyday Life</h2>

        <p class="text-slate-800 leading-relaxed mb-6">
          CBT doesn&apos;t require a therapist to get started. You can begin practicing its principles today by following these three simple steps:
        </p>

        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg my-8 border-l-4 border-green-500">
          <h3 class="text-xl font-bold text-slate-900 mb-4">Step 1: Identify the thought</h3>
          <p class="text-slate-800 leading-relaxed mb-4">
            Notice what you&apos;re telling yourself in moments of stress.
          </p>
          <p class="text-slate-700 italic mb-6">
            <strong>Example:</strong> &quot;I&apos;m exhausted; I need a drink to relax.&quot;
          </p>

          <h3 class="text-xl font-bold text-slate-900 mb-4">Step 2: Challenge the thought</h3>
          <p class="text-slate-800 leading-relaxed mb-6">
            Ask yourself, &quot;Is that really true? Has it ever helped in the long run?&quot;
          </p>

          <h3 class="text-xl font-bold text-slate-900 mb-4">Step 3: Replace the thought</h3>
          <p class="text-slate-800 leading-relaxed mb-4">
            Choose a healthier option: &quot;I can unwind by walking, journaling, or calling a friend.&quot;
          </p>
          <p class="text-slate-800 leading-relaxed italic">
            Every time you repeat this process, you&apos;re rewiring your brain for calm, clarity, and strength.
          </p>
        </div>

        <div class="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-lg my-8 border-l-4 border-pink-500">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">A Small Example, A Big Change</h2>
          
          <p class="text-slate-800 leading-relaxed mb-4">
            Meet John. After stressful days at work, his habit was to drink to relax. Through CBT, he learned to pause and ask: &quot;What am I really feeling right now?&quot;
          </p>

          <p class="text-slate-800 leading-relaxed mb-4">
            Instead of reaching for a drink, he started going for evening walks.
          </p>

          <p class="text-slate-800 leading-relaxed mb-4">
            It wasn&apos;t easy at first, but each small change built momentum.
          </p>

          <p class="text-slate-800 leading-relaxed italic">
            Eventually, John discovered something powerful — peace comes from within, not from a bottle.
          </p>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Power of Awareness</h2>

        <p class="text-slate-800 leading-relaxed mb-6">
          CBT teaches one essential truth: <strong>You can&apos;t change what you don&apos;t notice.</strong>
        </p>

        <p class="text-slate-800 leading-relaxed mb-8">
          Once you become aware of your thoughts, you gain the power to reshape them. That awareness creates hope — reminding you that you are not defined by your past but empowered by your choices.
        </p>

        <div class="bg-slate-100 p-6 rounded-lg my-8 border-l-4 border-slate-400">
          <h3 class="text-xl font-semibold text-slate-900 mb-3">Try This Simple CBT Tip</h3>
          <p class="text-slate-800 leading-relaxed mb-4">
            Take a moment right now and think of a negative thought that often holds you back. Then replace it with something kinder and truer:
          </p>
          <div class="space-y-2">
            <p class="text-red-600 font-semibold">❌ &quot;I can&apos;t do this.&quot;</p>
            <p class="text-green-600 font-semibold">✅ &quot;I&apos;ve made progress before; I can do it again.&quot;</p>
          </div>
          <p class="text-slate-800 leading-relaxed mt-4 italic">
            Repeat it daily. Over time, that small shift in thinking can change how you feel and how you live.
          </p>
        </div>

        <div class="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-xl my-10 shadow-lg">
          <h2 class="text-3xl font-bold text-slate-900 mb-6 text-center">Final Thought: Recovery Begins in the Mind</h2>
          
          <p class="text-slate-800 leading-relaxed mb-6 text-lg">
            Healing from addiction isn&apos;t just about stopping a behavior — it&apos;s about transforming how you see yourself.
          </p>

          <p class="text-slate-800 leading-relaxed mb-6 text-lg">
            Cognitive Behavioral Therapy gives you tools to take back your power, one thought and one day at a time.
          </p>

          <p class="text-slate-800 leading-relaxed mb-6 text-lg">
            At Iwacu Recovery Centre, we believe in the strength of the human mind to heal, grow, and thrive.
          </p>

          <blockquote class="text-2xl font-bold text-blue-700 text-center leading-relaxed italic">
            &quot;When the mind changes, life follows.&quot;
          </blockquote>
        </div>

        <div class="mt-12 pt-8 border-t border-slate-200">
          <p class="text-slate-600 italic text-center">
            This article is an invitation to begin your journey of mental transformation — to recognize that healing starts from within, one thought at a time.
          </p>
        </div>

      </div>
    `,
    category: 'wellness',
    readTime: "5 min read"
  }
];

// Education Articles
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
            critically examine motives and consequences. Addressing alcohol&apos;s role in society requires awareness, 
            compassion, and proactive engagement, both at the individual and community level.
          </p>
          <blockquote class="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-blue-50 rounded-r-lg">
            <p class="text-slate-800 italic mb-3 text-lg">For me, the key question is not only &quot;Why do we drink?&quot; but also &quot;What are we really thirsty for?&quot;</p>
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
    category: 'education',
    readTime: "12 min read"
  },
  {
    id: 2,
    title: "When a Man Fails to Love and a Woman Fails to Submit: Understanding God's Condition for Marriage",
    slug: "when-man-fails-to-love-woman-fails-to-submit",
    author: "Rev. Dr. Jean Claude MUREKEYIMANA",
    date: "2025-08-01",
    excerpt: "This paper critically examines the biblical framework of love and submission within marriage as outlined in Ephesians 5:22–33, exploring the divine order in marital relationships and the spiritual implications when these principles are neglected.",
    content: `
      <div class="article-content">
        <section class="abstract bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">Abstract</h2>
          <p class="text-slate-800 leading-relaxed mb-4">
            This paper critically examines the biblical framework of love and submission within marriage as outlined 
            in Ephesians 5:22–33. It explores the divine order in marital relationships, highlighting the husband&apos;s 
            responsibility to love sacrificially and the wife&apos;s call to submit trustfully, within a context of equality 
            and mutual respect. Drawing from recent theological scholarship (2020–2025), the discussion evaluates the 
            spiritual and relational implications when these principles are neglected, while emphasizing God&apos;s grace 
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
          <h2 class="text-3xl font-bold text-slate-900 mb-4">2. God&apos;s Design — The Divine Order</h2>
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
          <h2 class="text-3xl font-bold text-slate-900 mb-4">3. The Man&apos;s Responsibility — Love as Christ Loves</h2>
          <p class="text-slate-800 leading-relaxed mb-4">
            The biblical command for men to &quot;love their wives&quot; transcends emotional affection and calls for agapē love, 
            a sacrificial and unconditional love modeled after Christ&apos;s love for the Church. This divine mandate requires 
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
          <h2 class="text-3xl font-bold text-slate-900 mb-4">4. The Woman&apos;s Responsibility — Submission as Trust in God</h2>
          <p class="text-slate-800 leading-relaxed mb-4">
            Submission, often misunderstood, is not synonymous with servitude or blind compliance but reflects a voluntary 
            and faith-driven trust in God&apos;s order. The Greek term hupotassō conveys alignment under loving leadership 
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
            distance, conflict, and spiritual disarray. This breakdown mirrors the Genesis 3 narrative, where Adam&apos;s 
            failure to lead and Eve&apos;s deviation from her role ushered in disorder and pain. Modern studies highlight 
            similar patterns in contemporary marriages, where the absence of love and submission correlates with higher 
            rates of dissatisfaction and separation.
          </p>
          <p class="text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded border-l-4 border-slate-300">
            Personally, I see these dynamics as evidence that ignoring divine design inevitably leads to relational 
            instability and emotional disconnection.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">6. God&apos;s Condition and the Path to Restoration</h2>
          <p class="text-slate-800 leading-relaxed mb-4">
            Despite human shortcomings, God&apos;s standards remain unchanged—men are to love, and women are to submit. The 
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
            God&apos;s design for marriage is not burdensome but a blueprint for mutual flourishing. When husbands lead with 
            Christlike love and wives respond with trustful submission, marriage reflects the harmony of Christ and the 
            Church.
          </p>
          <blockquote class="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-blue-50 rounded-r-lg">
            <p class="text-slate-800 italic text-lg">
              Personally, this teaching challenges me to view marital roles not as rigid prescriptions but as divine 
              pathways to intimacy, respect, and spiritual growth. With God&apos;s guidance, every couple can strive to live 
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
              Seahipublications. (2022). Contextualizing Paul&apos;s theology on submission in Ephesians 5:21-33 as a 
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
  {
    id: 3,
    title: "What We're Really Thirsty For: A Wedding, Alcohol, and Life Lessons",
    slug: "what-are-we-really-thirsty-for",
    author: "Rev. Dr. Jean Claude MUREKEYIMANA",
    date: "2024-08-26",
    excerpt: "This story begins at a lavish wedding filled with laughter, music, and overflowing drinks. As I watched guests reach for glass after glass, some already drunk yet craving more, I found myself pulled from celebration into contemplation. What are we truly seeking when we reach for the bottle?",
    content: `
      <div class="article-content prose prose-lg max-w-none">
        
        <p class="text-slate-600 text-sm mb-8 italic">
          Published by Rev. Dr. Jean Claude MUREKEYIMANA, August 2024
        </p>

        <p class="text-slate-800 leading-relaxed mb-6">
          Recently, I attended the wedding of a friend and a well-known, successful businessman. It was a lavish celebration. Laughter echoed through the halls, music filled the air, and the tables were overflowing with drinks of every kind: soft drinks for some, but for most, the real attraction was the alcohol—whiskey, beer, wine… name it, it was there.
        </p>

        <p class="text-slate-800 leading-relaxed mb-6">
          People were enjoying themselves. <em>Really</em> enjoying. Glasses clinking, toasts flying, the atmosphere bubbling with excitement. But as I sat there taking it all in, something struck me—something that pulled me from celebration into contemplation.
        </p>

        <p class="text-slate-800 leading-relaxed mb-8 font-semibold text-lg">
          What is it about alcohol that pulls people in so deeply?
        </p>

        <div class="bg-gradient-to-r from-blue-50 to-pink-50 p-8 rounded-lg my-8 border-l-4 border-blue-500">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">The Man with the Empty Bottle</h2>
          
          <p class="text-slate-800 leading-relaxed mb-4">
            I watched as guests consumed drink after drink, some already visibly drunk yet still craving more. I saw a man, visibly disabled—not from birth, but clearly marked by the consequences of life, possibly alcohol itself. He sat with a small beer bottle in hand, sipping slowly.
          </p>

          <p class="text-slate-800 leading-relaxed mb-4">
            A big bottle of whiskey was brought out, and suddenly, the crowd surged forward, offering empty plastic bottles and old containers, eager for a share.
          </p>

          <p class="text-slate-800 leading-relaxed mb-4">
            Even this man, despite his condition, reached out. He received a portion and beamed with joy—the kind of joy that might mask pain, or perhaps defiance. He looked at his empty beer bottle before setting it aside, shook his head slowly, and reached for the whiskey.
          </p>

          <p class="text-slate-800 leading-relaxed italic">
            And in that moment, I felt something. A quiet voice inside whispered, <em>maybe he remembered how he got here. Maybe he chose to say, &quot;Disability is not inability.&quot;</em>
          </p>
        </div>

        <p class="text-slate-800 leading-relaxed mb-6">
          Whether or not I read too much into it, the moment stuck with me.
        </p>

        <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Marks We Carry</h2>

        <p class="text-slate-800 leading-relaxed mb-6">
          All around me, I saw reminders: broken teeth, bruised faces, weary expressions—markers of long battles with alcohol. Yet there they were, drinking like there was no tomorrow. In the middle of a joyous wedding, many were too drunk to dance, too lost to engage, too far gone to remember the celebration itself.
        </p>

        <p class="text-slate-800 leading-relaxed mb-8">
          And I remembered my own story. My own relationship with alcohol. The days when I was in love with the bottle; when it gave me courage, comfort, an illusion of power and presence.
        </p>

        <div class="bg-slate-100 p-6 rounded-lg my-8 border-l-4 border-slate-400">
          <p class="text-slate-900 font-semibold mb-3">
            But now, on the other side of that life, I find myself asking:
          </p>
          <ul class="space-y-2 text-slate-800 list-disc list-inside">
            <li>Why do we love alcohol so much?</li>
            <li>Is it culture?</li>
            <li>Peer pressure?</li>
            <li>Lack of information?</li>
            <li>Emotional pain?</li>
            <li>A coping mechanism?</li>
            <li>Or simply addiction masked as enjoyment?</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">A Moment of Recognition</h2>

        <p class="text-slate-800 leading-relaxed mb-6">
          At some point during the event, a drunk guest who once knew me in my drinking days staggered over. He had heard that I&apos;d changed, that I&apos;d found a new path.
        </p>

        <p class="text-slate-800 leading-relaxed mb-4">
          <em>&quot;I heard you&apos;re a priest now,&quot;</em> he said, slurring slightly. <em>&quot;Please, my elder, bless me.&quot;</em>
        </p>

        <p class="text-slate-800 leading-relaxed mb-6">
          He still remembered my past position in government and gave me a nod of respect, even in his intoxicated state.
        </p>

        <p class="text-slate-800 leading-relaxed mb-6">
          I looked at him with a mix of sorrow and compassion. <em>&quot;God bless you,&quot;</em> I said softly.
        </p>

        <p class="text-slate-800 leading-relaxed mb-8 font-semibold">
          And I meant it.
        </p>

        <p class="text-slate-800 leading-relaxed mb-8">
          Because behind the fun, the parties, and the bottles, there are stories. Stories of pain, of survival, of loss, of resilience—and sometimes, of denial.
        </p>

        <div class="bg-gradient-to-br from-blue-100 to-pink-100 p-8 rounded-xl my-10 shadow-lg">
          <h2 class="text-3xl font-bold text-slate-900 mb-6 text-center">Final Thought</h2>
          
          <p class="text-slate-800 leading-relaxed mb-6 text-lg">
            Alcohol isn&apos;t just a drink. For many, it&apos;s a mirror—a reflection of something deeper within. Some see celebration; others see escape. Some see a social tradition; others see chains.
          </p>

          <p class="text-slate-800 leading-relaxed mb-6 text-lg">
            But maybe, just maybe, it&apos;s time we start asking the harder questions.
          </p>

          <p class="text-2xl font-bold text-blue-700 text-center leading-relaxed">
            Not just, <em>&quot;Why do we drink?&quot;</em>
          </p>
          
          <p class="text-2xl font-bold text-blue-700 text-center leading-relaxed mt-4">
            But, <em>&quot;What are we really thirsty for?&quot;</em>
          </p>
        </div>

        <div class="mt-12 pt-8 border-t border-slate-200">
          <p class="text-slate-600 italic text-center">
            This story is an invitation—to introspection, compassion, and honest conversation about our relationship with alcohol and what it reveals about our deeper needs.
          </p>
        </div>

      </div>
    `,
    category: 'recovery',
    readTime: "8 min read"
  },
  ...mentalHealthArticles,
  ...wellnessTipsArticles
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