---
layout: default
title: Tags
permalink: /tags/
---
<h1 class="ptitle">Tags</h1>
{% assign tg = site.tags | sort %}
{% for t in tg %}
<h2 id="{{ t[0] }}" class="tagh">{{ t[0] }}</h2>
<ul class="plain">{% for p in t[1] %}<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a> <time>{{ p.date | date: "%d %b %Y" }}</time></li>{% endfor %}</ul>
{% endfor %}
